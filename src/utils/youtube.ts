export function youtubeID(url: string) {
    const [uri, composto] = url.split('?v=');
    const [uuid, params ]  = composto.split('&')
    return uuid;
}