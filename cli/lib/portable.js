'use strict';

function pathVariants(root) {
  const value = String(root || '');
  if (!value) return [];
  return [...new Set([
    value,
    value.replaceAll('\\', '/'),
    value.replaceAll('/', '\\')
  ])].sort((left, right) => right.length - left.length);
}

function portableString(value, roots) {
  const rootList = Array.isArray(roots) ? roots : [roots];
  return rootList.flatMap(pathVariants).reduce((text, root) => text
    .replaceAll(`${root}/`, './')
    .replaceAll(`${root}\\`, './')
    .replaceAll(root, '.'), String(value));
}

function portableValue(value, roots) {
  if (typeof value === 'string') return portableString(value, roots);
  if (Array.isArray(value)) return value.map((item) => portableValue(item, roots));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, portableValue(item, roots)]));
  }
  return value;
}

module.exports = { pathVariants, portableString, portableValue };
