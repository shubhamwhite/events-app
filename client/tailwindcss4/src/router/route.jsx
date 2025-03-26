import {createBrowserRouter} from 'react-router'

import App from '../App'
import EventGallery from '../pages/EventGallery'
import FeatureEvent from '../pages/FeatureEvent'
import Service from '../pages/Service'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
    },
    {
        path: '/gallery',
        Component: EventGallery,
    },
    {
        path: '/event',
        Component: FeatureEvent,
    },
    {
        path: '/service',
        Component: Service,
    }
])