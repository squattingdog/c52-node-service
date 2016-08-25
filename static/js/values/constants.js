var constants_object = {
    //crypto
    CRYPTO_ALGORITHM: 'AES256',
    CRYPTO_KEY_LENGTH: 32
};

try{ //try setting up for include for NodeJS
    module.exports = constants_object;
} catch (ex) {
    //don't do anything, this is probably a browser request.
}