import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
	index('./routes/Main.tsx'),
	route('services', './routes/Services.tsx'),
	route('cases', './routes/Cases.tsx'),
	route('about', './routes/About.tsx'),
	route('contacts', './routes/Contacts.tsx'),
	route('services/:name', './routes/SpecificService.tsx'),
] satisfies RouteConfig
