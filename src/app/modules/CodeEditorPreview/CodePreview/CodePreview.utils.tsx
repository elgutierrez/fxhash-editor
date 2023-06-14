export const getPreviewHtml = (script: string) => `
    <html>
      <head>
        <script>
          ${script}
        </script>
      </head>
      <body>
        <canvas/>
      </body>
    </html>`;
