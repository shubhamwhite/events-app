import {createBrowserRouter} from 'react-router'

import App from '../App'
import EventGallery from '../pages/EventGallery'
import FeatureEvent from '../pages/FeatureEvent'
import Service from '../pages/Service'
import Testimonial from '../pages/Testimonials'
import Contact from '../pages/Contact'
import Store from '../pages/BookStore'
import EventBlog from '../pages/EventBlog'
import NotFound from '../pages/NotFound'

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
    },
    {
        path: '/testimonial',
        Component: Testimonial,
    },
    {
        path: '/contact',
        Component: Contact,
    }
    ,
    {
        path: '/store',
        Component: Store,
    }
    ,
    {
        path: '/blog',
        Component: EventBlog,
    },
    // Add this as the last route
    {
        path: '*',
        Component: NotFound,
    }
])