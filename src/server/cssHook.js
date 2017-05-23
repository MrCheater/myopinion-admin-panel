import cssHook from 'css-modules-require-hook';

cssHook({
    generateScopedName: '[name]__[local]',
    extensions : '.scss'
});