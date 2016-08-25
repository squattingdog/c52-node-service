module.exports = function (session) {
    return {
        pfxPath: './certificates/c52a.pfx',
        pfxPass: 'passwd',
        allowedIPs: ['::', '::ffff:127.0.0.1', '::1', '127.0.0.1'], //localhost
        accessTokenTTL: 10
    }
}