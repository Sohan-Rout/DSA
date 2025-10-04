const fs = require('fs');
const path = require('path');

// Helper function to recursively get all routes from app/ folder
function getAllAppRoutes(dir = 'app', prefix = '') {
    const routes = [];
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (item === 'api') return; // skip API routes
            routes.push(...getAllAppRoutes(fullPath, `${prefix}/${item}`));
        } else if (item.endsWith('.js') || item.endsWith('.tsx')) {
            let route = `${prefix}/${item.replace(/\.js|\.tsx$/, '')}`;
            if (route.endsWith('/page')) route = route.replace('/page', '');
            routes.push(route);
        }
    });

    return routes;
}

/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://dsavisualizer.in',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    transform: async (config, path) => ({
        loc: path,
        lastmod: new Date().toISOString(),
    }),
    additionalPaths: async (config) => {
        const appRoutes = getAllAppRoutes(); // auto-detect all pages
        return appRoutes.map(route => ({
            loc: route,
            lastmod: new Date().toISOString(),
        }));
    },
};

module.exports = config;