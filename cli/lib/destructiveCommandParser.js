'use strict';

function tokenizeCommand(command) {
  const text = String(command || '').trim();
  const tokens = [];
  let current = '';
  let quote = null;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quote) {
      if (character === quote) quote = null;
      else current += character;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
    } else if (/\s/u.test(character)) {
      if (current) {
        tokens.push(current);
        current = '';
      }
    } else {
      current += character;
    }
  }
  if (current) tokens.push(current);
  return { tokens, balanced: !quote };
}

function unsupportedCommand(reasonCodes = ['UNSUPPORTED_COMMAND_FORM'], extra = {}) {
  return {
    matched: true,
    supported: false,
    operation: extra.operation || 'unknown',
    requestedTarget: extra.requestedTarget || '',
    recursive: Boolean(extra.recursive),
    force: Boolean(extra.force),
    reasonCodes: [...new Set(reasonCodes)],
    ...extra
  };
}

function parseNamedProbe(tokens) {
  const result = { operation: '', requestedTarget: '' };
  for (let index = 1; index < tokens.length; index += 1) {
    if (tokens[index] === '--operation') {
      result.operation = tokens[index + 1] || '';
      index += 1;
    } else if (tokens[index] === '--path') {
      result.requestedTarget = tokens[index + 1] || '';
      index += 1;
    } else {
      return unsupportedCommand(['UNSUPPORTED_COMMAND_FORM'], { source: 'codex_hook_probe' });
    }
  }
  if (!result.operation || !result.requestedTarget) {
    return unsupportedCommand(['MISSING_TARGET'], { ...result, source: 'codex_hook_probe' });
  }
  return {
    matched: true,
    supported: true,
    operation: result.operation,
    requestedTarget: result.requestedTarget,
    recursive: result.operation === 'recursive_delete',
    force: false,
    reasonCodes: [],
    source: 'codex_hook_probe'
  };
}

function parseRm(tokens) {
  const targets = [];
  let recursive = false;
  let force = false;
  let optionsEnded = false;
  for (const token of tokens.slice(1)) {
    if (!optionsEnded && token === '--') {
      optionsEnded = true;
    } else if (!optionsEnded && token.startsWith('-')) {
      if (token === '--recursive') recursive = true;
      else if (token === '--force') force = true;
      else if (/^-[rRf]+$/u.test(token)) {
        recursive ||= /[rR]/u.test(token);
        force ||= /f/u.test(token);
      } else {
        return unsupportedCommand(['UNSUPPORTED_COMMAND_FORM']);
      }
    } else {
      targets.push(token);
    }
  }
  if (targets.length !== 1) {
    return unsupportedCommand(
      [targets.length ? 'MULTIPLE_TARGETS' : 'MISSING_TARGET'],
      { operation: recursive ? 'recursive_delete' : 'delete', recursive, force }
    );
  }
  return {
    matched: true,
    supported: true,
    operation: recursive ? 'recursive_delete' : 'delete',
    requestedTarget: targets[0],
    recursive,
    force,
    reasonCodes: [],
    source: 'raw_command'
  };
}

function parseRemoveItem(tokens) {
  const targets = [];
  let recursive = false;
  let force = false;
  for (let index = 1; index < tokens.length; index += 1) {
    const token = tokens[index];
    const lower = token.toLowerCase();
    if (lower === '-recurse') recursive = true;
    else if (lower === '-force') force = true;
    else if (lower === '-path' || lower === '-literalpath') {
      if (!tokens[index + 1]) return unsupportedCommand(['MISSING_TARGET']);
      targets.push(tokens[index + 1]);
      index += 1;
    } else if (token.startsWith('-')) {
      return unsupportedCommand(['UNSUPPORTED_COMMAND_FORM']);
    } else {
      targets.push(token);
    }
  }
  if (targets.length !== 1) {
    return unsupportedCommand(
      [targets.length ? 'MULTIPLE_TARGETS' : 'MISSING_TARGET'],
      { operation: recursive ? 'recursive_delete' : 'delete', recursive, force }
    );
  }
  return {
    matched: true,
    supported: true,
    operation: recursive ? 'recursive_delete' : 'delete',
    requestedTarget: targets[0],
    recursive,
    force,
    reasonCodes: [],
    source: 'raw_command'
  };
}

function parseWindowsDelete(tokens, executable) {
  const targets = [];
  let recursive = false;
  let force = false;
  for (const token of tokens.slice(1)) {
    if (/^\/[sqfa]+(?::.*)?$/iu.test(token)) {
      recursive ||= /s/iu.test(token);
      force ||= /f/iu.test(token);
    } else {
      targets.push(token);
    }
  }
  if (targets.length !== 1) {
    return unsupportedCommand(
      [targets.length ? 'MULTIPLE_TARGETS' : 'MISSING_TARGET'],
      { operation: executable === 'rmdir' || executable === 'rd' ? 'remove_directory' : recursive ? 'recursive_delete' : 'delete', recursive, force }
    );
  }
  return {
    matched: true,
    supported: true,
    operation: executable === 'rmdir' || executable === 'rd' ? 'remove_directory' : recursive ? 'recursive_delete' : 'delete',
    requestedTarget: targets[0],
    recursive,
    force,
    reasonCodes: [],
    source: 'raw_command'
  };
}

function parseGit(tokens) {
  const subcommand = String(tokens[1] || '').toLowerCase();
  if (subcommand === 'clean') {
    const flags = tokens.slice(2);
    if (!flags.length || flags.some((token) => !/^-[fdx]+$/iu.test(token))) {
      return unsupportedCommand(['UNSUPPORTED_COMMAND_FORM'], { operation: 'clean_untracked', requestedTarget: '.' });
    }
    return {
      matched: true,
      supported: true,
      operation: 'clean_untracked',
      requestedTarget: '.',
      recursive: flags.some((token) => /d/iu.test(token)),
      force: flags.some((token) => /f/iu.test(token)),
      reasonCodes: [],
      source: 'raw_command'
    };
  }
  if (subcommand === 'reset' && tokens.slice(2).some((token) => token.toLowerCase() === '--hard')) {
    return {
      matched: true,
      supported: true,
      operation: 'destructive_reset',
      requestedTarget: '.',
      recursive: false,
      force: true,
      reasonCodes: [],
      source: 'raw_command'
    };
  }
  return unsupportedCommand(['UNSUPPORTED_COMMAND_FORM']);
}

function parseDestructiveCommand(command) {
  const text = String(command || '').trim();
  if (!text) return { matched: false, supported: false, reasonCodes: [] };
  const destructiveMarker = /\b(?:rm|remove-item|del|erase|rmdir|rd|git\s+(?:clean|reset)|cct-preflight-probe)\b/iu;
  if (!destructiveMarker.test(text)) return { matched: false, supported: false, reasonCodes: [] };
  if (text.includes('`') || text.includes('$(')) return unsupportedCommand(['COMMAND_SUBSTITUTION']);
  if (/[\r\n]|&&|\|\||[;|<>]/u.test(text)) return unsupportedCommand(['COMMAND_CHAINING']);

  const tokenized = tokenizeCommand(text);
  if (!tokenized.balanced) return unsupportedCommand(['UNTERMINATED_QUOTE']);
  let tokens = tokenized.tokens;
  if (!tokens.length) return unsupportedCommand(['MISSING_TARGET']);
  if (String(tokens[0]).toLowerCase() === 'sudo') tokens = tokens.slice(1);
  if (!tokens.length) return unsupportedCommand(['UNSUPPORTED_COMMAND_FORM']);

  const executable = String(tokens[0]).replaceAll('\\', '/').split('/').pop().toLowerCase();
  if (executable === 'cct-preflight-probe') return parseNamedProbe(tokens);
  if (['sh', 'bash', 'zsh', 'pwsh', 'powershell', 'cmd'].includes(executable)) {
    return unsupportedCommand(['UNSUPPORTED_COMMAND_FORM']);
  }
  if (executable === 'rm') return parseRm(tokens);
  if (executable === 'remove-item') return parseRemoveItem(tokens);
  if (['del', 'erase', 'rmdir', 'rd'].includes(executable)) return parseWindowsDelete(tokens, executable);
  if (executable === 'git') return parseGit(tokens);
  return unsupportedCommand(['UNSUPPORTED_COMMAND_FORM']);
}

module.exports = { parseDestructiveCommand };
