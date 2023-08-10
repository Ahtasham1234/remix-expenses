import { cssBundleHref } from "@remix-run/css-bundle";
import sharedStyles from '~/styles/shared.css'
import Error from '~/components/util/Error'

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: sharedStyles }
];
function Document({title, children}){
  return (
    <html lang="en">
    <head>
      {
        title &&  <title>{title}</title>
      }
     
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
     
     {children}
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>

  )
}
export default function App() {
  return (
   <Document><Outlet /></Document>
  );
}
export function ErrorBoundary(){
  const error = useRouteError()
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    console.log('errorr', error)
    return (
     <Document title={error.statusText}>
      <main>
        <Error title={error.statusText}>
          <p>{error.data}</p>
          <p>Back to <Link to='/'>Safety</Link></p>
        </Error>
      </main>
     </Document>
    );
  }

  return (
    <Document title='Something went wrong'>
    <main>
      <Error title='Something went wrong!'>
        <p>{error.message || 'Something went wrong'} </p>
        <p>Back to <Link to='/'>Safety</Link></p>
      </Error>
    </main>
   </Document>
  
  );

}
export function meta(){
  return [{
    title: 'Remix Expenses',
    description: 'Create expenses with ease.'
  }]
}
