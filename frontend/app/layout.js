import './globals.css'
import { Nunito } from 'next/font/google'
import '../public/template/css/sb-admin-2.min.css'
import '../public/template/css/fontawesome-free/css/all.min.css'
const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Jurandir Lanches',
  description: 'Sistema de gerenciamento do jurandir lanches',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={nunito.className}>
            {children}
            <script src="/template/js/jquery.min.js"></script>
            <script src="/template/js/bootstrap.bundle.min.js"></script>
            <script src="/template/js/sb-admin-2.min.js"></script>
    
        
        </body>
    
    </html>
  )
}
