import Convert from './src';


export { Convert, Convert as default};

// For CommonJS default export support 
module.exports = Convert;
module.exports.Convert = Convert; // old export method ..
module.exports.default = Convert;
