import React from 'react';
import DDSLoader from '../utils/DDSLoader';
import MTLLoader from '../utils/MTLLoader';
import OBJLoader from '../utils/OBJLoader';
import {OrbitControls} from "../three.js-master/examples/jsm/controls/OrbitControls";

import "./Model.css";

class Model extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: props.filename
        };
        this.animate = this.animate.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.onError = this.onError.bind(this);
        this.onProgress = this.onProgress.bind(this);
    }

    componentDidMount() {
        this.init(this.root);
        this.animate();
    }

    //Listens for an update from the NavMenu and re-renders.
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.filename !== prevProps.filename){
            this.setState({fileName: this.props.filename}),
                console.log("from model.js filename: "+ this.props.filename);
            this.init(this.root)
        }
    }

    // Initialized the Model through Three.js
    init(parent) {
        const onProgress = this.onProgress;
        const onError = this.onError;

        const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.z = 350;
        camera.position.x = 250;
        camera.position.y = 250;

        const scene = new THREE.Scene();
        scene.add(new THREE.GridHelper(1000, 10));
        var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );

        scene.add( ambientLight );
        let pointLight = new THREE.PointLight( 0xffffff, 0.8 );
        camera.add( pointLight );
        scene.add( camera );

        THREE.Loader.Handlers.add( /\.dds$/i, new DDSLoader() );

        // get filename from props
        let fileName = this.props.filename;
        //console.log("from model " + fileName);

/*
        var mesh = null;

        var mtlLoader = new MTLLoader();
        mtlLoader.setPath( 'assets/' );
        mtlLoader.load( 'materials/' + fileName + '.mtl', function( materials ) {

            materials.preload();

            var objLoader = new OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( 'assets/' );
            objLoader.load( 'meshes/' + fileName + '.obj', function ( object ) {

                mesh = object;
                scene.add( mesh );

            } );

        } );
*/

        const mtlLoader = new MTLLoader();
        mtlLoader.setPath( 'assets/' );
        mtlLoader.load( 'materials/' + fileName + '.mtl', function( materials ) {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( 'assets/' );
            objLoader.load( 'meshes/' + fileName + '.obj', function ( object ) {
                object.position.y = 0;
                object.position.x = 0;
                scene.add( object );
            }, onProgress, onError );
        });


        const renderer = new THREE.WebGLRenderer({canvas: this.canvas});
        renderer.setPixelRatio( window.devicePixelRatio );

        // set the model width and height based on its container
        const modelContainer = document.getElementById("model-container");
        let mcWidth =  modelContainer.getClientRects().item(0).width;
        let mcHeight = modelContainer.getClientRects().item(0).height;
        let sq = (mcWidth > mcHeight ? mcWidth : mcHeight);
        renderer.setSize( sq, sq);
        camera.aspect = sq / sq;
        camera.updateProjectionMatrix();

        this.setState({camera, scene, renderer});
        window.addEventListener( 'resize', this.onWindowResize, false );

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor= .25;
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        controls.enablePan = false;
        controls.maxDistance = 1500;
        controls.update();

        //set the state in order to be able to call for the components in other functions.
        this.setState({camera, scene, renderer, controls});
    }

    renderObj() {
        const {camera, scene, renderer, controls} = this.state;
        if (camera && scene && renderer && controls) {
            camera.lookAt( scene.position );
            renderer.render( scene, camera );
            controls.update();
        }
    }

    animate() {
        const {camera, scene, renderer, controls} = this.state; //added this and the if statement because enabledamping is on
        requestAnimationFrame( this.animate );
        if (controls){
            controls.update();
        }
        this.renderObj();
    }

    onError(xhr) {
    }

    onProgress(xhr) {
        if ( xhr.lengthComputable ) {
            let percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    }
    onWindowResize() {
        const {camera, renderer} = this.state;
        if (camera && renderer) {
            const modelContainer = document.getElementById("model-container");
            let mcWidth = modelContainer.clientWidth;
            let mcHeight = modelContainer.clientHeight;
            let sq = (mcWidth > mcHeight ? mcHeight : mcWidth);
            renderer.setSize( mcWidth, mcHeight);
            camera.aspect = mcWidth / mcHeight;
            camera.updateProjectionMatrix();
        }
    }

    render () {
        return (
            // <div className="jumbotron" ref={(el) => this.root = el} id={"model-container"}>
                <canvas id={"model-container"} ref={(el) => this.canvas = el}/>
            // </div>
        );
    }
}

export default Model;