import config from './models.json';

const baseUrl = (import.meta.env.VITE_MODEL_BASE_URL || config.baseUrl).replace(/\/+$/, '');

const isAbsolute = (u) => /^(https?:)?\/\//i.test(u);
const resolve = (u) => encodeURI(isAbsolute(u) ? u : `${baseUrl}/${u}`);

/** Returns { obj, mtl, resourceUrl } for a view id (e.g. "Thruster"), or null. */
export function getModelUrls(viewId) {
    const entry = config.models[viewId];
    if (!entry) return null;
    const obj = resolve(entry.obj);
    return {
        obj,
        mtl: entry.mtl ? resolve(entry.mtl) : null,
        // textures referenced by the .mtl are resolved relative to the mtl's folder
        resourceUrl: entry.mtl ? resolve(entry.mtl).replace(/[^/]*$/, '') : null,
    };
}
