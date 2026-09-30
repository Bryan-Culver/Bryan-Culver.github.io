import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { getModelUrls } from '../config/modelUrls';

import './Model.css';

function disposeObject(object) {
    object.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((m) => {
            if (!m) return;
            if (m.map) m.map.dispose();
            m.dispose();
        });
    });
}

// Scene/renderer are created once; the model is swapped when `viewId` changes.
function Model({ viewId }) {
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);

        const scene = new THREE.Scene();
        scene.add(new THREE.GridHelper(1000, 10));
        scene.add(new THREE.AmbientLight(0xffffff, 1.2));

        const camera = new THREE.PerspectiveCamera(45, 1, 1, 2000);
        camera.position.set(250, 250, 350);
        const headlight = new THREE.DirectionalLight(0xffffff, 2);
        camera.add(headlight);
        scene.add(camera);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        controls.enablePan = false;
        controls.maxDistance = 1500;

        const resize = () => {
            const { clientWidth: w, clientHeight: h } = canvas;
            if (!w || !h) return;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        resize();
        window.addEventListener('resize', resize);

        let frame;
        const animate = () => {
            frame = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        sceneRef.current = scene;
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', resize);
            controls.dispose();
            scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
            renderer.dispose();
            sceneRef.current = null;
        };
    }, []);

    useEffect(() => {
        const scene = sceneRef.current;
        const urls = getModelUrls(viewId);
        if (!scene || !urls) { setStatus('error'); return undefined; }

        let cancelled = false;
        let loaded = null;
        setStatus('loading');

        const onObject = (result) => {
            const object = result.scene || result; // GLTFLoader returns { scene }
            if (cancelled) { disposeObject(object); return; }
            loaded = object;
            scene.add(object);
            setStatus('ready');
        };
        const onError = (err) => {
            console.error(`Failed to load model "${viewId}" from ${urls.obj}`, err);
            if (!cancelled) setStatus('error');
        };
        const loadObj = (materials) => {
            const objLoader = new OBJLoader();
            if (materials) objLoader.setMaterials(materials);
            objLoader.load(urls.obj, onObject, undefined, onError);
        };

        if (/\.(glb|gltf)(\?|$)/i.test(urls.obj)) {
            new GLTFLoader().load(urls.obj, onObject, undefined, onError);
        } else if (urls.mtl) {
            const mtlLoader = new MTLLoader();
            mtlLoader.setResourcePath(urls.resourceUrl);
            mtlLoader.load(urls.mtl, (materials) => {
                materials.preload();
                if (!cancelled) loadObj(materials);
            }, undefined, (err) => {
                console.warn(`No materials for "${viewId}", using defaults`, err);
                if (!cancelled) loadObj(null);
            });
        } else {
            loadObj(null);
        }

        return () => {
            cancelled = true;
            if (loaded) { scene.remove(loaded); disposeObject(loaded); }
        };
    }, [viewId]);

    return (
        <div className="model-wrap">
            <canvas id="model-container" ref={canvasRef} />
            {status !== 'ready' && (
                <div className="model-status">
                    {status === 'loading' ? 'Loading 3D model…' : 'Could not load 3D model.'}
                </div>
            )}
        </div>
    );
}

export default Model;
