export const getAssetPath = (path: string) => {
    const basePath = process.env.NODE_ENV === 'production' ? '/3D-Solar-System-Website' : '';
    // Ensure path starts with a slash
    const formattedPath = path.startsWith('/') ? path : `/${path}`;
    return `${basePath}${formattedPath}`;
};
