import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'

const queryClient = new QueryClient()
import { NotificationContextProvider } from './NotificationContext'
import { UserContextProvider } from './UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </NotificationContextProvider>
    </QueryClientProvider>
)
