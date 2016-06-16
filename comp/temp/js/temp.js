/**
 * Created by joe on 27/06/15.
 */
/**
 * Created by joe on 16/08/2014.
 */

//todo Use screen in screen in 3d on time

//todo Make particles flying around me

//todo Record voice over for video of kinect


function T3 ()
{
    var ecpa;
    var cubeparticle;
    var cpaaa;
    var composer, effectFocus;
    var appendE;
    var asyncLoop;
    var camera;
    var campos;
    var cap;
    var ccc;
    var center;
    var cHH;
    var clock;
    var container2;
    var controls;
    var cube;
    var cwpp;
    var cWW;
    var dist;
    var divVal;
    var divValSixtied;
    var earthTexture;
    var finalRenderTarget;
    var fqShift;
    var fsMesh;
    var geometry;
    var goc;
    var i, vi, c;
    var integ;
    var integz;
    var intersects;
    var linearTween;
    var lookMaterial;
    var looky;
    var map;
    var mePartMat;
    var mePartTex;
    var meVid;
    var meVidCanvas;
    var meVidctx;
    var object;
    var objects;
    var particleGoesToPoint;
    var particleIsAtPoint;
    var particles;
    var PointCloud;
    var partSysGeomColours;
    var partSysGeomColoursLength;
    var partSysGeomVertices;
    var phi;
    var pixels;
    var pixLen;
    var pL4;
    var plane;
    var PlaneBufferGeometry;
    var planeMaterial;
    var projector;
    var randy;
    var raycaster;
    var renderer;
    var renderhooks;
    var runnerTexture;
    var scene;
    var target;
    var tempp;
    var tempposss;
    var temppp;
    var thereee;
    var v;
    var vcount;
    var vector;
    var videoWidth, videoHeight;
    var vv;
    var wrapFunction;
    var x;
    var xxx;
    var xxxx;
    var xyzz;
    var yu;
    var yyyy;
    var zzzz;
    this.userInteracts=0;
    this.t3Go = 0;
    this.funqueue = [];
    this.funqueueTemp = [];
    this.camseq = - 1;
    PointCloud = null;
    objects = [];
    this.turn = 0;
    renderhooks = {};
    videoWidth = mainApp.videoWidth;
    videoHeight = mainApp.videoHeight;
    //addCam();
    this.posi = 1;
    this.cc = 11;
    this.deployed = 0;
    this.zDepthCutoffPoint = 330;
    this.depthzz = 10000;
    this.initzUpdate = function ()
    {
        renderer.setSize ( window.innerWidth, window.innerHeight );
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix ();
        //console.log ( "updaaaate" );
        requestAnimationFrame ( animate );
        fqShift ();
    };
    function gddd ()
    {
        //console.log ( "*** function gddd() {" );
        t3.deployed = 1;
    }

    this.planeOnOff = function (planeGo)
    {
        t3.planeGo = planeGo;
        t3.plane.visible = t3.planeGo != 0;
    };
    this.planeRealTime = function ()
    {
        PlaneBufferGeometry = new THREE.PlaneBufferGeometry ( 512, 256 );
        finalRenderTarget = new THREE.WebGLRenderTarget ( 1024, 512, {format: THREE.RGBAFormat} );
        planeMaterial = new THREE.MeshBasicMaterial ( {map: finalRenderTarget} );
        t3.plane = new THREE.Mesh ( PlaneBufferGeometry, planeMaterial );
        t3.plane.position.set ( 0, 100, - 500 );
        scene.add ( t3.plane );
        t3.planeOnOff ( 1 );
    };
    function createArray (length)
    {

        //console.log ( "*** function createArray(length) {" );
        var args;
        var arr = new Array ( length || 0 ),
            i = length;
        if (arguments.length > 1)
        {
            args = Array.prototype.slice.call ( arguments, 1 );
            while (i --)
            {
                arr[length - 1 - i] = createArray.apply ( this, args );
            }
        }
        return arr;
    }
    this.makeFsMesh =function () {

        //console.log ( "*** function makeFsMesh() {" );

        var texture1 = new THREE.Texture ( pg[28].pgCanvasV );
        texture1.needsUpdate = true;
        fsMesh = new THREE.Mesh (
            new THREE.PlaneGeometry ( window.innerWidth, window.innerHeight ), new THREE.MeshBasicMaterial ( {
                map: texture1,
                transparent: true,
                side: THREE.DoubleSide

            } ) );
        // cube.name = "cube";
        var xxxx = camera.position.x;
        var yyyy = camera.position.y + mainApp.nnutop;
        var zzzz = camera.position.z + (window.innerHeight / 2 / Math.tan ( Math.PI * camera.fov / 360 ));

        var thereee = new THREE.Vector3 ( xxxx, yyyy, zzzz );

        //  fsMesh.position = thereee;

        //console.log ( "xxx" + xxxx + "yyy" + yyyy + "zzz" + zzzz );

        scene.add ( fsMesh );
        objects.push ( fsMesh );
        fsMesh.quaternion = camera.quaternion;

        dist = window.innerHeight / 2 / Math.tan ( Math.PI * camera.fov / 360 );
        fsMesh.lookAt ( camera.position );
        camera.add ( fsMesh );
        fsMesh.position.set ( 0, mainApp.nnutop, - dist );
        //console.log ( "dist = " + dist + "     camera.position.z = " + camera.position.z + "fsMesh.position.z = " + fsMesh.position.z );
        fsMesh.rotation.set ( 0, 180, 0 );

    }
////

    /////
    /*	handMesh.screenPosition = function(position) {
     var camera, height, screenPosition, width;
     camera = scope.camera;
     console.assert(camera instanceof THREE.Camera, "screenPosition expects camera, got", camera);
     width = parseInt(window.getComputedStyle(scope.renderer.domElement).width, 10);
     height = parseInt(window.getComputedStyle(scope.renderer.domElement).height, 10);
     console.assert(width && height);
     screenPosition = new THREE.Vector3();
     if (position instanceof THREE.Vector3) {
     screenPosition.fromArray(position.toArray());
     } else {
     screenPosition.fromArray(position).sub(this.positionRaw).add(this.position);
     }
     screenPosition.project(camera);
     screenPosition.x = (screenPosition.x * width / 2) + width / 2;
     screenPosition.y = (screenPosition.y * height / 2) + height / 2;
     console.assert(!isNaN(screenPosition.x) && !isNaN(screenPosition.x), 'x/y screen position invalid');
     return screenPosition;
     };
     handMesh.screenPosition = function(position) {
     var camera, height, screenPosition, width;
     camera = scope.camera;
     console.assert(camera instanceof THREE.Camera, "screenPosition expects camera, got", camera);
     width = parseInt(window.getComputedStyle(scope.renderer.domElement).width, 10);
     height = parseInt(window.getComputedStyle(scope.renderer.domElement).height, 10);
     console.assert(width && height);
     screenPosition = new THREE.Vector3();
     if (position instanceof THREE.Vector3) {
     screenPosition.fromArray(position.toArray());
     } else {
     screenPosition.fromArray(position).sub(this.positionRaw).add(this.position);
     }
     screenPosition = projector.projectVector(screenPosition, camera);
     screenPosition.x = (screenPosition.x * width / 2) + width / 2;
     screenPosition.y = (screenPosition.y * height / 2) + height / 2;
     console.assert(!isNaN(screenPosition.x) && !isNaN(screenPosition.x), 'x/y screen position invalid');
     return screenPosition;
     };


     */





    this.xp3 = 47;
    this.xp4 = 600;
    this.xp = 1700;
    this.xp2 = 0.175;
    asyncLoop = function (o)
    {
        var i = 0,
            length = o.length;
        var loop = function ()
        {
            if (i == length)
            {
                o.callback ();
                return;
            }
            o.functionToLoop ( loop, i );
            i ++;
        };
        loop (); //init
    };
    this.meshh = function ()
    {

        //console.log ( "*** function meshh() {" );
        t3.wwi = mainApp.t3CanvasWidth;
        t3.hhi = mainApp.t3CanvasHeight;
        t3.meshArray = [];
        t3.canvasArrPos = [];
        t3.cubesArrived = 0;
        asyncLoop (
            {
                length        : mainApp.pgTotal,
                functionToLoop: function (loop, i)
                {
                    setTimeout (
                        function ()
                        {
                            t3.makeCube ( i );
                            loop ();
                        }, 4
                    );
                },
                callback      : function ()
                {
                    t3.meshhh = 1;
                    gddd ();
                }
            }
        );
        renderhooks["cubesMove"] = function ()
        {
            var difAp;
            for (xyzz = t3.cubesArrived; xyzz < t3.cubesReady; xyzz += 1)
            {
                cap = t3.canvasArrPos[xyzz];
                map = t3.meshArray[xyzz].position;
                difAp = Math.round ( (cap[1] - map.y) / 6 );
                //console.log ( "cap=map" + difAp + "     " + map );
                map.x += ((cap[0] - map.x) / 6);
                map.y += (difAp);
                map.z += ((cap[2] - map.z) / 6);
                if (difAp == 0)
                {
                    t3.cubesArrived ++;
                    if (t3.cubesArrived == 31)
                    {
                        delete renderhooks["cubesMove"];
                        //console.log ( "delete renderhooks[cubesMove]" );
                        //// sttttttooopppppppped cubesReady
                    }
                }
            }
        };
        renderhooks["cubesLook"] = function ()
        {
            for (xyzz = 0; xyzz < t3.cubesReady; xyzz += 1)
            {
                t3.meshArray[xyzz].lookAt ( t3.lookylook.position );
            }
        }
    };
    this.moveCam = function ()
    {
        t3.userInteracts=0;
        renderhooks["moveCam"] = function ()
        {
            t3.countMove = t3.countMove + 1;
            if (t3.userInteracts==1)
            {
                delete renderhooks["moveCam"];
                console.log ( "delete renderhooks[				t3.userInteracts=1]" )
            }
            if (t3.countMove > 100 && Math.floor ( integz * camera.fov ) == Math.floor ( integz * cwpp[3] ) && Math.floor ( integz * camera.position.x ) == Math.floor ( integz * cwpp[0] ) && Math.floor ( integz * camera.position.y ) == Math.floor ( integz * cwpp[1] ))
            {
                delete renderhooks["moveCam"];
                console.log ( "delete renderhooks[moveCam]" )
            }
            camera.position.x += (cwpp[0] - camera.position.x) * integ;
            camera.position.y += (cwpp[1] - camera.position.y) * integ;
            camera.position.z += (cwpp[2] - camera.position.z) * integ;
            camera.fov += (cwpp[3] - camera.fov) * 0.01;
            camera.updateProjectionMatrix ();
        }
    };
    this.ranCamMov = function ()
    {
        //console.log ( cwpp + "    " + campos[3] );
        campos[3] = [scene.position.x + (Math.random () - 0.5) * 10000, scene.position.y + (Math.random () - 0.5) * 10000, scene.position.z + (Math.random () - 0.5) * 10000, 70];
        t3.posi = 3;
        cwpp = campos[3];
        t3.countMove = 0;
        //console.log ( cwpp + "    " + campos[3] );
        t3.moveCam ();
    };
    var cubeCount;
    var cubePos=0;

    this.makeCube = function (i)
    {
        cubeCount=i-pg[i].pgSectionMin;
        if (pg[i].pgHeaderYes == 1)
        {
            cubeCount=-1;

            console.log ( "*** function makeCube(i) {" + i );

        }
        if (pg[i].pgImageMade == 1)
        {
            createUI.materialsArray[i] = new THREE.Texture ( createUI.cArray[i] );
            //ll.ll ( "made", i );
        }
        else
        {
            //ll.ll ( "NOTmade", i );
            createUI.materialsArray[i] = new THREE.ImageUtils.loadTexture ( 'assets/cube/sml/cube_' + i + '.jpg' );
        }
        cube = new THREE.Mesh (
            new THREE.PlaneBufferGeometry ( t3.wwi, t3.hhi ), new THREE.MeshBasicMaterial (
                {
                    map        : createUI.materialsArray[i],
                    transparent: true,
                    side       : THREE.DoubleSide
                }
            )
        );
        /*cube2 = new THREE.Mesh (
         new THREE.PlaneBufferGeometry ( t3.wwi, 64 ), new THREE.MeshBasicMaterial (
         {
         map        : createUI.materialsArray[i],
         transparent: true,
         side       : THREE.DoubleSide
         }
         )
         );
         cube.add(cube2);
         cube2.position.y=30;*/
        this.canvasArrPos[i] = [];
        cube.name = "cube";
        t3.meshArray[i] = cube;
        t3.meshArray[i].name = i;
        createUI.materialsArray[i].needsUpdate = true;
        phi = (i-pg[i].pgSectionMin) * t3.xp2 + Math.PI;
        xxxx = t3.xp * Math.sin ( phi );
        yyyy = - ( (cubeCount) * t3.xp3) + t3.xp4 - (150*pg[i].pgSectNum);
        zzzz = t3.xp * Math.cos ( phi );
        tempposss = new THREE.Vector3 ( 0, 0, 0 );
        t3.canvasArrPos[i][0] = xxxx;
        t3.canvasArrPos[i][1] = yyyy;
        t3.canvasArrPos[i][2] = zzzz;
        thereee = new THREE.Vector3 ( xxxx, yyyy, zzzz );
        t3.meshArray[i].position = tempposss;
        t3.meshArray[i].lookAt ( camera.position );
        //console.log ( "xxx" + xxxx + "yyy" + yyyy + "zzz" + zzzz );
        scene.add ( t3.meshArray[i] );
        objects.push ( t3.meshArray[i] );
        t3.cubesReady = i + 1;
        if (t3.deployed != 3)
        {
            t3.deployed = 3
        }
    };
    this.mapB = THREE.ImageUtils.loadTexture ( "part.png" );
    this.materialB = new THREE.SpriteMaterial ( {map: this.mapB, transparent: true} );
    this.makeCubeparticle = function (i)
    {
        //console.log ( "*** function makeCubeParticle(i) {" + i );
        cpaaa = Math.random () * 0.08;
        cubeparticle = new THREE.Sprite ( t3.materialB );
        t3.cubeparticleArray[i] = cubeparticle;
        ecpa = t3.cubeparticleArray[i];
        ecpa.offsetx = Math.random () * 10;
        ecpa.offsetd = cpaaa;
        ecpa.offsetyy = Math.random () * 10;
        ecpa.offsetyyy = ecpa.offsetyy;
        ecpa.offsetzz = Math.random () * 1;
        phi = i * t3.xp2 + Math.PI;
        xxxx = t3.xp * Math.sin ( phi );
        yyyy = (- (i * t3.xp3) + t3.xp4);
        zzzz = t3.xp * Math.cos ( phi );
        ecpa.material.color.setHex ( Math.random () * 0xffffff );
        ecpa.position.set ( xxxx, yyyy, zzzz );
        //ecpa.position.normalize();
        ecpa.scale.set ( 256, 32, 0.3 ); // imageWidth, imageHeight
        //console.log ( "xxx" + xxxx + "yyy" + yyyy + "zzz" + zzzz );
        scene.add ( ecpa );
    };
    this.www = function ()
    {
        var eee = 0;
        t3.cubeparticleArray = [];
        //var materialB = new THREE.SpriteMaterial( { map: mapB, color: 0xffffff, fog: true } );
        for (i = 0; i < 111; i ++)
        {
            t3.makeCubeparticle ( i );
        }
        renderhooks["www"] = function ()
        {
            for (i = 0; i < 111; i ++)
            {
                ecpa = t3.cubeparticleArray[i];
                ecpa.scale.set ( 256 * 0.25, 32 * 0.25, 0.03 ); // imageWidth, imageHeight
                ecpa.offsetd += 0.01;
                //ecpa.offsetx = ecpa.offsetx - ecpa.offsetd;
                //ecpa.offsetyy = ecpa.offsetyy + ecpa.offsetd / 400;
                if (ecpa.offsetyy < 20)
                {
                    ecpa.offsetyy = ecpa.offsetyyy;
                }
                eee = ecpa.offsetx;
                //eey = ecpa.offsetyy;
                //eez = ecpa.offsetzz;
                phi = i * t3.xp2 + Math.PI + ecpa.offsetd;
                xxxx = t3.xp * Math.sin ( phi ) * (ecpa.offsetyy);
                yyyy = (- (i * t3.xp3) + t3.xp4) / (i / 30) + i * 28 - 500;
                zzzz = t3.xp * Math.cos ( phi );
                ecpa.position.x = xxxx;
                ecpa.position.y = yyyy;
                ecpa.position.z = zzzz;
                if (i == 1)
                {
                    //console.log("eeeeee"+xxxx);
                }
                //t3.meshArray[i].lookAt ( camera.position );
            }
        }
    };

    function stepTarget ()
    {

        //console.log ( "*** function stepTarget() {" );
        t3.posi = 3;
        t3.moveCam ();
        t3.camrot = 1;
        t3.camseq ++;
        if (t3.camseq == mainApp.pgTotal)
        {
            t3.camseq = 0
        }
    }

    linearTween = function (t, b, c, d)
    {
        return c * t / d + b;
    };
    this.goNuts2 = function ()
    {
        cancelAnimationFrame ( t3.animate )
    };
    this.goNuts = function (inout)
    {
        //t3.camMoveXYZF("default1",scene.position.y + inout * 30000,"default1","default1")
        t3.t3Go = 1;
        if (inout != - 1)
        {
            t3.t3Go = 0;
            setTimeout (
                function ()
                {
                    //cancelAnimationFrame ( t3.animate );
                }, 1000
            );
        }
    };
    function stepp (aaa)
    {

        //console.log ( "*** function stepp(aaa) {" );
        t3.camrot = 0;
        t3.camthere = 0;
        t3.textchoice = 0;
        t3.posi = aaa - 1;
    }

    // Function wrapping code.
    // fn - reference to function.
    // context - what you want "this" to be.
    // params - array of parameters to pass to function.
    fqShift = function ()
    {
        var tempFunq;
        if (t3.funqueue.length > 0)
        {
            tempFunq = (t3.funqueue.shift ()) ();
            wrapFunction ( tempFunq );
        }
    };
    wrapFunction = function (fn, params, tim)
    {
        if (t3.t3Go != 0)
        {
            //ll.ll ( "wrap" + fn, 56 )
            return function ()
            {
                setTimeout (
                    function ()
                    {
                        fn.apply ( this, params );
                        if (t3.funqueue.length > 0)
                        {
                            if (t3.t3Go != 0)
                            {
                                //t3.funqueueTemp[0] = t3.funqueue[0];
                                fqShift ();
                            }
                        }
                    }, tim
                );
            };
        }
    };
    this.planeCamMov = function (xx, yy)
    {
        //console.log ( cwpp + "    " + campos[3] );
        campos[3] = [t3.plane.position.x, t3.plane.position.y, t3.plane.position.z - 150, 70];
        t3.posi = 3;
        cwpp = campos[3];
        t3.countMove = 0;
        //console.log ( cwpp + "    " + campos[3] );
        this.moveCam ();
    };
    this.camMoveXYZF = function (movexx, moveyy, movezz, movefov)
    {
        if (movexx == "default1")
        {
            movexx = camera.position.x;
        }
        if (moveyy == "default1")
        {
            moveyy = camera.position.y;
        }
        if (movezz == "default1")
        {
            movezz = camera.position.z;
        }
        if (movefov == "default1")
        {
            movefov = camera.movefov;
        }
        else
        {
            movefov = 70
        }
        //console.log ( cwpp + "    " + campos[3] );
        campos[3] = [movexx, moveyy, movezz, movefov];
        t3.posi = 3;
        cwpp = campos[3];
        t3.countMove = 0;
        //console.log ( cwpp + "    " + campos[3] );
        this.moveCam ();
    };
    this.planeMoveZ = function ()
    {
        //console.log("plane this "+t3.plane.position);
        t3.plane.position.set ( 0, 100, t3.plane.position.z - 50 );
    };
    function animate ()
    {
        var delta = clock.getDelta();
        var key;
        if (t3.t3Go != 1)
        {
        }
        else
        {

            //console.log ("*** function animate() {");
            requestAnimationFrame ( animate );
            controls.update ( delta );
            for (key in renderhooks)
            {
                renderhooks[key] ();
            }
        }
        if (t3.planeGo == 1)
        {
            t3.plane.visible = false;
            renderer.render ( scene, camera, finalRenderTarget, true );
            //t3.plane.visible = true;
        }
        renderer.clear ();
        composer.render ( delta );
        //renderer.render ( scene, camera );
        intersect();
    }

    function docclickhandler ()
    {
        t3.noXY = 0;
        //console.log ( "*** function docclickhandler() {" );
        t3.partShape += 1;
        if (t3.partShape > 1)
        {
            t3.partShape = 0;
        }
    }

    document.addEventListener ( 'mousedown', onDocumentMouseDown, true );
    //projector = new THREE.Projector ();
    function onDocumentMouseDown (event)
    {
        var gotoTThreePg;
        if (t3.t3Go != 0)
        {
            event.preventDefault ();
            vector = new THREE.Vector3 ( (event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0.5 );
            vector.unproject ( camera );
            raycaster = new THREE.Raycaster ( camera.position, vector.sub ( camera.position ).normalize () );
            intersects = raycaster.intersectObjects ( objects );
            gotoTThreePg = parseInt ( intersects[0].object.name );
            console.log ( intersects[0].object.name + "***" );
            if (intersects.length > 0)
            {
                if (gotoTThreePg > - 1 && gotoTThreePg < mainApp.pgTotal + 1)
                {
                    pg[mainApp.pgCurrent].leavePage ( mainApp.pgCurrent );
                    pageTrans.interaction (mainApp.pgCurrent, gotoTThreePg, "header");
                    pageTrans.turnPage ( mainApp.pgCurrent, gotoTThreePg, "header" );
                }
                intersects[0].object.material.color.setHex ( Math.random () * 0xffffff );
            }
        }
    }

    this.initz = function () {
        var rtParameters;
        var y;

        var ambient;
        var dirLight;
        var textureFlare0;
        var textureFlare2;
        var textureFlare3;
        var renderModel;
        var effectBloom;
        var effectFilm;
        t3.countMove = 0;
        //console.log ( "*** function initz() {" );
        //  $ ( this ).resize ( $.debounce ( 2500, onthisResize ) );
        //  this.addEventListener('resize', onthisResize, false);
        container2 = document.createElement('div');
        appendE = document.getElementById("pg28");
        appendE.appendChild(container2);
        container2.style.position = 'absolute';
        renderer = new THREE.WebGLRenderer(
            {
                preserveDrawingBuffer: true,
                alpha: true,
                antialias: true
            }
        );
        renderer.autoClearColor = true;
        this.renderer = renderer;
        renderer.setSize(window.innerWidth, window.innerHeight);
        container2.appendChild(renderer.domElement);
        renderer.setClearColor(0x000000, 0);
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        camera.position.y = 200;
        scene = new THREE.Scene();
        clock = new THREE.Clock();
        camera.position.z = -1500;
        scene.add(camera);
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.movementSpeed = 2500;
        controls.rollSpeed = Math.PI / 6;
        controls.autoForward = false;
        // postprocessing
        renderModel = new THREE.RenderPass(scene, camera);
        effectBloom = new THREE.BloomPass(0.6175);
        effectFilm = new THREE.FilmPass(0.1, 0.1, 1448, false);
        effectFocus = new THREE.ShaderPass(THREE.FocusShader);
        effectFocus.uniforms["screenWidth"].value = createUI.windowWidth;
        effectFocus.uniforms["screenHeight"].value = createUI.windowHeight;
        effectFocus.renderToScreen = true;
        rtParameters = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            stencilBuffer: true
        };

        composer = new THREE.EffectComposer(renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, rtParameters));
        composer.addPass(renderModel);
        //composer.addPass( effectBloom );
        composer.addPass(effectFilm);
        composer.addPass(effectFocus);
        this.composer = composer;
        vizzle.glitchBack(pg[28].pgCanvasV);
        pg[28].pgTextLayout.style.visibility = "hidden";
        setTimeout(
            function () {
                animate()
            }, 1200
        );
        scene.fog = new THREE.Fog(0xfd504f, 1000, 6000);
        scene.fog.color.setHSL(0.51, 0.4, 0.01);
        renderer.setClearColor(scene.fog.color, 1);

        function lensFlareUpdateCallback(object) {

            var f, fl = object.lensFlares.length;
            var flare;
            var vecX = -object.positionScreen.x * 2;
            var vecY = -object.positionScreen.y * 2;


            for (f = 0; f < fl; f++) {

                flare = object.lensFlares[f];

                flare.x = object.positionScreen.x + vecX * flare.distance;
                flare.y = object.positionScreen.y + vecY * flare.distance;

                flare.rotation = 0;

            }

            object.lensFlares[2].y += 0.025;
            object.lensFlares[3].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad(45);

        }

        textureFlare0 = THREE.ImageUtils.loadTexture("assets/lensflare/lensflare0.png");
        textureFlare2 = THREE.ImageUtils.loadTexture("assets/lensflare/lensflare2.png");
        textureFlare3 = THREE.ImageUtils.loadTexture("assets/lensflare/lensflare3.png");
        textureFlare4 = THREE.ImageUtils.loadTexture("assets/lensflare/lensflare4.png");
        textureFlare5 = THREE.ImageUtils.loadTexture("assets/lensflare/lensflare5.png");
        textureFlare6 = THREE.ImageUtils.loadTexture("assets/lensflare/lensflare6.png");
        textureFlare7 = THREE.ImageUtils.loadTexture("assets/lensflare/lensflare7.png");

        addLight(0.55, 0.9, 0.5, 411, 0, -2000);
        //addLight( 0.08, 0.8, 0.5,    0, 0, -1000 );
        //addLight( 0.995, 0.5, 0.9, 5000, 5000, -1000 );

        function addLight(h, s, l, x, y, z) {

            var flareColor;
            var lensFlare;
            var light = new THREE.PointLight(0xffffff, 1.5, 4500);
            light.color.setHSL(h, s, l);
            light.position.set(x, y, z);
            scene.add(light);

            flareColor = new THREE.Color(0xffffff);
            flareColor.setHSL(h, s, l + 0.5);

            lensFlare = new THREE.LensFlare(textureFlare0, 256, 0.0, THREE.AdditiveBlending, flareColor);

            lensFlare.add(textureFlare2, 16, 0.8, THREE.AdditiveBlending);
            lensFlare.add(textureFlare2, 256, 0.4, THREE.AdditiveBlending);
            lensFlare.add(textureFlare2, 256, 0.5, THREE.AdditiveBlending);

            lensFlare.add(textureFlare3, 64, 0.6, THREE.AdditiveBlending);
            lensFlare.add(textureFlare4, 64, 0.7, THREE.AdditiveBlending);
            lensFlare.add(textureFlare5, 128, 0.9, THREE.AdditiveBlending);
            lensFlare.add(textureFlare6, 32, 1.0, THREE.AdditiveBlending);
            lensFlare.add(textureFlare7, 32, 0.3, THREE.AdditiveBlending);

            lensFlare.customUpdateCallback = lensFlareUpdateCallback;
            lensFlare.position.copy(light.position);

            scene.add(lensFlare);
            t3.lensFlare = lensFlare
        }

        //  var runnerzTexture = new THREE.ImageUtils.loadTexture ( 'assets/arrowdwn.png' );
        //earthTexture = new THREE.ImageUtils.loadTexture ( 'assets/earth.jpg' );
        lookMaterial = new THREE.MeshBasicMaterial(
            {
                //map: runnerzTexture,
                side: THREE.DoubleSide,
                visible: false,
                transparent: true
            }
        );
        looky = new THREE.PlaneBufferGeometry(250, 250, 1, 1);
        t3.lookylook = new THREE.Mesh(looky, lookMaterial);
        t3.lookylook.position.set(0, -0, -5000);
        scene.add(t3.lookylook);
        t3.geometry = new THREE.SphereGeometry(1000, 80, 120);
        t3.geometry.y = 0;
        t3.geometry.x = 0;
        t3.geometry.z = -5000;
        t3.xs = [];
        t3.ys = [];
        t3.zs = [];

        campos = [
            [0, 0, -1200, 70],
            [0, 1000, 0, 174],
            [0, 0, -1200, 70],
            [0, 0, -1200, 70]
        ];
        //  shuffle(geometry.vertices);
        this.lerp = function (a, b, t) {
            return a + (b - a) * t;
        };
        meVid = document.createElement("video");
        meVid.loop = true;
        meVid.src = 'assets/512.webm';
        meVid.play();
        meVid.width = videoWidth;
        meVid.height = videoHeight;
        meVidCanvas = createUI.createCanvas(videoWidth, videoHeight);
        meVidctx = meVidCanvas.getContext('2d');
        meVid.play();
        createUI.meVidCanvas = meVidCanvas;
        cWW = meVidCanvas.width;
        cHH = meVidCanvas.height;
        this.moveCam();
        goc = 0;
        ccc = new THREE.Vector3(0, 1000, 0);
        //runnerTexture = new THREE.ImageUtils.loadTexture ( 'assets/arrowdwn.png' );
        mePartTex = new THREE.Texture(meVidCanvas);
        particles = new THREE.Geometry();
        mePartMat = new THREE.PointCloudMaterial(
            {
                color: 0xFFFFFF,
                sizeAttenuation: true,
                vertexColors: true,
                size: mainApp.t3PartSize,
                map: mePartTex,
                blending: THREE.AdditiveBlending,
                wireframe: true,
                transparent: true
            }
        );
        t3.sl = t3.geometry.vertices.length;
        particles.sortParticles = true;
        vcount = 0;
        t3.textchoice = 0;
        t3.particleDest = [];
        particles.colors = [];
        particles.originalPosition = [];
        for (yu = 0; yu < videoHeight * videoWidth + 1; yu += 1) {
            t3.particleDest[yu] = [];
            for (x = 0; x < 5; x += 1) {
                t3.particleDest[yu][x] = [];
            }
        }
        for (y = 0; y < videoHeight; y += 1) {
            for (x = 0; x < videoWidth; x += 1) {
                vcount += 1;
                //                                           temppp = 1;
                temppp = ((Math.random() - 0.5) * mainApp.t3PartVidRandomPos);
                tempp = ((Math.random() - 0.5) * mainApp.t3PartSphereRandomPos);
                vv = vcount % t3.sl;
                geometry = t3.geometry;
                //console.log(""+vcount);
                t3.particleDest[vcount][0][0] = ((x - videoWidth / 2) * 10) + tempp;
                t3.particleDest[vcount][0][1] = ((y - videoHeight / 2) * 10) + tempp;
                t3.particleDest[vcount][0][2] = 0;
                t3.particleDest[vcount][1][0] = geometry.vertices[vv].x + temppp;
                t3.particleDest[vcount][1][1] = geometry.vertices[vv].y + temppp;
                t3.particleDest[vcount][1][2] = geometry.vertices[vv].z + temppp;
                v = new THREE.Vector3(0, 0, 1 * (30000));
                particles.vertices.push(v);
                particles.colors.push(new THREE.Color(0xfff000));
            }
        }
        PointCloud = new THREE.PointCloud(particles, mePartMat);
        PointCloud.sortParticles = true;
        scene.add(PointCloud);
        PointCloud.z = -5000;
        partSysGeomVertices = PointCloud.geometry.vertices;
        partSysGeomColours = PointCloud.geometry.colors;
        partSysGeomColoursLength = partSysGeomColours.length;
        meVidctx.drawImage(meVid, 0, 0, videoWidth, videoHeight);
        pixels = meVidctx.getImageData(0, 0, videoWidth, videoHeight).data;
        pixLen = pixels.length;
        createUI.pixlen = pixLen;
        pL4 = pixLen * 4;
        divValSixtied = 60 / pL4;
        t3.partShape = 1;
        this.funqueue = [wrapFunction(docclickhandler, [1], 1111), wrapFunction(stepp, [2], 11), wrapFunction(this.www, [2], 11), wrapFunction(docclickhandler, [1], 11), wrapFunction(stepp, [1], 6111), wrapFunction(docclickhandler, [1], 1), wrapFunction(t3.planeRealTime, [1], 1000), wrapFunction(this.meshh, [2], 5511), wrapFunction(stepTarget, [1], 6611), wrapFunction(stepTarget, [2], 3333), wrapFunction(stepTarget, [2], 2222), wrapFunction(stepTarget, [2], 1111), wrapFunction(stepTarget, [2], 366), wrapFunction(stepTarget, [2], 366), wrapFunction(stepTarget, [2], 366), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 155), wrapFunction(stepTarget, [2], 366), wrapFunction(stepTarget, [2], 1111), wrapFunction(stepp, [1], 6111), wrapFunction(this.ranCamMov, [1], 6111)];
        fqShift();
        renderhooks["lookyLook"] = function () {

            // renderhooks[looky]=function(){}
            t3.lookylook.position.x += (camera.position.x - t3.lookylook.position.x) / 15;
            t3.lookylook.position.y += (camera.position.y - t3.lookylook.position.y) / 15;
            t3.lookylook.position.z += (camera.position.z - t3.lookylook.position.z) / 15;
        };
        renderhooks[0] = function () {
            var aadaa;
            integ = mainApp.t3CamSpeed;
            integz = mainApp.t3CamArrivalStickiness;
            //cam position when circling the cards
            if (t3.camrot == 1) {
                cwpp = campos[2];
                cwpp[0] = (t3.meshArray[t3.camseq].position.x) * 1.3;
                cwpp[1] = (t3.meshArray[t3.camseq].position.y) + 200;
                cwpp[2] = (t3.meshArray[t3.camseq].position.z) * 1.3;
                cwpp[3] = 100;
            }
            else {
                cwpp = campos[t3.posi];
            }
            mePartTex.needsUpdate = true;
            //    mePartMat.map = mePartTex;
            if (t3.meshhh == 1) {
                t3.meshhh = 2;
                t3.xyzz = 0;
            }
            // checks if texture exists
            randy = 1;
            meVidctx.drawImage(meVid, 0, 0, videoWidth, videoHeight);
            pixels = meVidctx.getImageData(0, 0, videoWidth, videoHeight).data;
            for (i = 0; i < pixLen; i += 4) {
                aadaa = 0.01;
                vi = partSysGeomColoursLength - i / 4 - 1;
                particleIsAtPoint = partSysGeomVertices[vi];
                divVal = divValSixtied * i;
                particleGoesToPoint = t3.particleDest[vi][t3.partShape];
                c = partSysGeomColours[vi];
                c.r = pixels[i] / 1 * aadaa;
                c.g = pixels[i + 1] / 1 * aadaa;
                c.b = pixels[i + 2] / 1 * aadaa;
                // OPTIMISE - IF THERE dont calculate
                if (t3.noXY != 1) {
                    particleIsAtPoint.x += (particleGoesToPoint[0] - particleIsAtPoint.x) / divVal;
                    particleIsAtPoint.y += (particleGoesToPoint[1] - particleIsAtPoint.y) / divVal;
                }
                if (t3.partShape == 0) {
                    particleIsAtPoint.z = ((-((pixels[i] + pixels[i + 2] + pixels[i + 3]) / 3 * mainApp.t3KinectVidDepth) + 1000));
                    if (t3.zDepthCutoffPoint < particleIsAtPoint.z) {
                        particleIsAtPoint.z = t3.depthzz
                    }
                }
                else {
                    particleIsAtPoint.z += (particleGoesToPoint[2] - particleIsAtPoint.z) / divVal;
                }
            }
            if (t3.partShape == 0 && t3.noXY != 1) {
                if (Math.floor((partSysGeomVertices[7000].x) / 0.01) == Math.floor((t3.particleDest[7000][0][0]) / 0.01)) {
                    t3.noXY = 1;
                }
                else {
                }
            }
            ;
            /*
             Three.js "tutorials by example"
             Author: Lee Stemkoski
             Date: July 2013 (three.js v59dev)
             // SKYBOX/FOG
             var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
             var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
             var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
             scene.add(skyBox);
             */

        }}

// custom global variables
    var projector2,sprite1, mouse = { x: 0, y: 0 }, INTERSECTED;

    var canvas1, context1, texture1;




    ////////////
    // CUSTOM //
    ////////////



    //////////////////////////////////////////



    function onDocumentMouseMove( event )
    {
        // the following line would stop any other event handler from firing
        // (such as the mouse's TrackballControls)
        // event.preventDefault();

        // update sprite position
        sprite1.position.set( event.clientX, event.clientY - 20, 0 );

        // update the mouse variable
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    }
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    function intersect()
    {
        if(window.asdasdasdasd!=0){// initialize object to perform world/screen calculations
            (window.asdasdasdasd=0)
            projector2 = new THREE.Projector();

            // when the mouse moves, call the given function

            /////// draw text on canvas /////////

            // create a canvas element
            canvas1 = document.createElement('canvas');
            context1 = canvas1.getContext('2d');
            context1.font = "Bold 20px Arial";
            context1.fillStyle = "rgba(0,0,0,0.95)";
            context1.fillText('Hello, world!', 0, 20);

            // canvas contents will be used for a texture
            texture1 = new THREE.Texture(canvas1)
            texture1.needsUpdate = true;

            ////////////////////////////////////////

            var spriteMaterial = new THREE.SpriteMaterial( { map: texture1, useScreenCoordinates: true} );

            sprite1 = new THREE.Sprite( spriteMaterial );
            sprite1.scale.set(200,100,1.0);
            sprite1.position.set( 50, 50, 0 );
            scene.add( sprite1 );}

        // create a Ray with origin at the mouse position
        //   and direction into the scene (camera direction)
        var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
        vector.unproject ( camera );
        var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

        // create an array containing all objects in the scene with which the ray intersects
        var intersectsj = ray.intersectObjects( scene.children );

        // INTERSECTED = the object in the scene currently closest to the camera
        //		and intersected by the Ray projected from the mouse position

        // if there is one (or more) intersections
        if ( intersectsj.length > 0 )
        {						ll.ll("lkjkj"+pg[intersectsj[ 1 ].object.name].title,88)
            // if the closest object intersected is not the currently stored intersection object
            if ( intersectsj[ 1 ].object != INTERSECTED )
            {
                // restore previous intersection object (if it exists) to its original color
                if ( INTERSECTED )
                    INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                // store reference to closest object as current intersection object
                INTERSECTED = intersectsj[ 1 ].object;
                // store color of closest object (for later restoration)
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                // set a new color for closest object
                INTERSECTED.material.color.setHex( 0xffff00 );

                // update text, if it has a "name" field.
                if ( pg[intersectsj[ 1 ].object.name].title )
                {
                    context1.clearRect(0,0,640,480);
                    var message = pg[intersectsj[ 1 ].object.name].title;
                    ll.ll("lkjkj"+message,88)
                    var metrics = context1.measureText(message);
                    var width = metrics.width;
                    context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
                    context1.fillRect( 0,0, width+8,20+8);
                    context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
                    context1.fillRect( 2,2, width+4,20+4 );
                    context1.fillStyle = "rgba(0,0,0,1)"; // text color
                    context1.fillText( message, 4,20 );
                    texture1.needsUpdate = true;
                }
                else
                {
                    context1.clearRect(0,0,300,300);
                    texture1.needsUpdate = true;
                }
            }
        }
        else // there are no intersections
        {
            // restore previous intersection object (if it exists) to its original color
            if ( INTERSECTED )
                INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
            // remove previous intersection object reference
            //     by setting current intersection object to "nothing"
            INTERSECTED = null;
            context1.clearRect(0,0,300,300);
            texture1.needsUpdate = true;
        }



    }}
