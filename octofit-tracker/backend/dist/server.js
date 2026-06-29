export const port = Number(process.env.PORT ?? 8000);
export const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
