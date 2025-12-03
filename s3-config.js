// Configuração para carregar imagens do S3
(function() {
    // URL base do S3 onde as imagens estão hospedadas
    var S3_BASE_URL = 'https://skylineip.s3.amazonaws.com/Tour%20Virtual/ancora/lapentor';
    
    // Intercepta requisições de imagens do krpano
    if (typeof XMLHttpRequest !== 'undefined') {
        var originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
            // Se a URL começa com /uploads/, adiciona o prefixo do S3
            if (url && typeof url === 'string' && url.indexOf('/uploads/') === 0) {
                url = S3_BASE_URL + url;
                console.log('Loading from S3:', url);
            }
            return originalOpen.call(this, method, url, async, user, password);
        };
    }
    
    // Também intercepta fetch se disponível
    if (typeof fetch !== 'undefined') {
        var originalFetch = window.fetch;
        window.fetch = function(url, options) {
            if (typeof url === 'string' && url.indexOf('/uploads/') === 0) {
                url = S3_BASE_URL + url;
                console.log('Fetching from S3:', url);
            }
            return originalFetch.call(this, url, options);
        };
    }
    
    console.log('S3 asset loader configured:', S3_BASE_URL);
})();
