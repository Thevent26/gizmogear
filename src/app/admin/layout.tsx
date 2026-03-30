export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Content Manager — GizmoGear</title>
      </head>
      <body>
        {children}
        <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" async />
      </body>
    </html>
  )
}
