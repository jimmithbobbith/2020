(function (window) {
    var delta;
    var plen;
    var maintext;
    var nlnl;
    var enen;
    var visi;
    var i;
    var texturefront;
    var textureback;
    var raycaster;
    var intersects;
    var gotoTThreePg;
    var vector;
    var controls;
    var multx, multy, pindex, Sin, objects, fsMesh, fsMeshB, tdd, clock, Cos;
    var mt_title;
    var mt_subheader;
    var mt_paragraph1;
    var mt_paragraph2;
    var container,emailz, camera, scene, renderer, projector, targetRotationY, targetRotationOnMouseDownY, targetRotationX, targetRotationOnMouseDownX, rad, mouse, mouseX, mouseXOnMouseDown, mouseY, mouseYOnMouseDown, mstack, bend, windowHalfX, windowHalfY, w, h, w2, h2, book, pagew, pageh, fl, fr;
    /**
     * Provides requestAnimationFrame in a cross browser way.
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    window.nlnl = true;
    window.language="NL";
    multx = 0.5 * Math.PI,
        multy = -Math.PI,
        Sin = Math.sin;
    Cos = Math.cos;
    self;
    if (!window.requestAnimationFrame) {

        window.requestAnimationFrame = (function () {

            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (/* function FrameRequestCallback */callback, /* DOMElement Element */element) {

                    window.setTimeout(callback, 1000 / 60);

                }
                ;

        })();

    }


    targetRotationY = 0,
        targetRotationOnMouseDownY = 0,
        targetRotationX = 0,
        targetRotationOnMouseDownX = 0,
        rad = 700,
        mouse = {
            x: 0,
            y: 0
        },
        mouseX = 0,
        mouseXOnMouseDown = 0,
        mouseY = 0,
        mouseYOnMouseDown = 0,
        windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2,
        pagew = 300,
        pageh = pagew;


    function onDocumentMouseDown(event) {
        // event.preventDefault();
        vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        vector.unproject(camera);
        raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {
            gotoTThreePg = parseInt(intersects[0].object.name);
            console.log(intersects[0].object.name + "***");
            if (intersects[0].object.name == "right") {
                poopRight()
            } else {

                poopLeft();

            }

            intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
        }



    }



    function animate() {
        // setup next animation
        requestAnimationFrame(animate);
        window.vidf(window.bkbk.flippedleft*2);
        if(window.bkbk.flippedleft>0){
            window.vidf(window.bkbk.flippedleft*2-1);

        }

        // use spherical coordinatess
        // for mouse control viewing
        if (window.ttdd) {


            delta = clock.getDelta();

           // controls.update(delta);



        }

        TWEEN.update();
        renderer.render(scene, camera);
    }

    function poopRight() {


        plen = book.pages.length;
        pindex = book.flippedleft - 1
        ;

        if (pindex >= 0 && pindex <= plen) {
            book.pages[pindex].flipRight();
            //    fillstuff(pindex - 1);
        }


    }

    function poopLeft() {

        console.log("left");

        plen = book.pages.length;
        pindex = plen - book.flippedright;

        if (pindex >= 0 && pindex < plen)
            book.pages[pindex].flipLeft();


        // fillstuff(pindex);
    }

    function fillstart() {
        console.log("gpgp");
        $("#covermain").fadeOut("slow");
        videoArr[0].play();
        pindex = -1;
        fillstuff(-1);
        var logoutEl = document.getElementById('logout');
        var helpEl = document.getElementById('help');
        var feedbackEl = document.getElementById('feedback');
        var tech = document.getElementById('tech');
        var emailz = document.getElementById('emailz');

        new Opentip(helpEl, "klik hier voor de volgende pagina", {
            style: "dark",
            target: fl,
            tipJoint: "top",
            targetJoint: "bottom",
            containInViewport: true




        });
        new Opentip(helpEl, "klik hier voor de vorige pagina", {
            style: "dark",
            target: fr,
            tipJoint: "top",
            targetJoint: "bottom",
            containInViewport: true

        });
        new Opentip(helpEl, "Kies Nederlands", {
            style: "dark",
            target: nlnl,
            tipJoint: "top",
            targetJoint: "bottom",
            containInViewport: true

        });
        new Opentip(helpEl, "Email jouw Dokter", {
            style: "dark",
            target: emailz,
            tipJoint: "top",
            targetJoint: "bottom",
            containInViewport: true

        });
        new Opentip(helpEl, "Change Language to English", {
            style: "dark",
            target: enen,
            tipJoint: "top",
            targetJoint: "bottom",
            containInViewport: true

        });
        new Opentip(helpEl, "Uitloggen", {
            style: "dark",
            target: logoutEl,
            tipJoint: "top",
            targetJoint: "bottom",
            containInViewport: true

        });
        new Opentip(helpEl, "Ideeenbus, alles wat er beter kan aan deze app", {
            style: "dark",
            target: feedbackEl,
            tipJoint: "top",
            targetJoint: "bottom",
            containInViewport: true

        });
        /*new Opentip(helpEl, "Medewerker", {
            style: "dark",
            target: addPatientsEl,
            tipJoint: "right",
            targetJoint: "left",
            containInViewport: false

        });*/
        new Opentip(helpEl, "Werkt de app niet goed? Laat het ons weten!", {

            style: "dark",
            target: tech,
            tipJoint: "bottom",
            targetJoint: "top",
            containInViewport: true
        });


    }

    function fillstuff(pindexx) {

        if (pindexx == -2) {
            pindexx = -1
        }
        maintext = document.getElementById('maintext');
        $("#maintext").fadeOut("slow", function () {
            console.log("this is ------ "+pindexx);
            mt_title = document.getElementById('mt_title');
            mt_subheader = document.getElementById('mt_subheader');
            mt_paragraph1 = document.getElementById('mt_paragraph1');
            mt_paragraph2 = document.getElementById('mt_paragraph2');
            if (pindexx < book.pages.length) {

                switch ( window.language){
                    case "EN":
                        $(mt_title).html(pgs[pindexx + 1].title);
                        $(mt_subheader).html(pgs[pindexx + 1].subheader);
                        $(mt_paragraph1).html(pgs[pindexx + 1].paragraph1);
                        $(mt_paragraph2).html(pgs[pindexx + 1].paragraph2);
                        break;
                    case "PO":
                        $(mt_title).html(pgs[pindexx + 1].titlePO);
                        $(mt_subheader).html(pgs[pindexx + 1].subheaderPO);
                        $(mt_paragraph1).html(pgs[pindexx + 1].paragraph1PO);
                        $(mt_paragraph2).html(pgs[pindexx + 1].paragraph2PO);
                        break;
                    case "NL":
                        $(mt_title).html(pgs[pindexx + 1].titlenl);
                        $(mt_subheader).html(pgs[pindexx + 1].subheadernl);
                        $(mt_paragraph1).html(pgs[pindexx + 1].paragraph1nl);
                        $(mt_paragraph2).html(pgs[pindexx + 1].paragraph2nl);
                        break;
                    default : alert("I\'m sure it was great");
                }/*
                if (window.nlnl != 1) {

                    $(mt_title).html(pgs[pindexx + 1].titleen);
                    $(mt_subheader).html(pgs[pindexx + 1].subheader);
                    $(mt_paragraph1).html(pgs[pindexx + 1].paragraph1);
                    $(mt_paragraph2).html(pgs[pindexx + 1].paragraph2);

                } else {

                    $(mt_title).html(pgs[pindexx + 1].titlenl);
                    $(mt_subheader).html(pgs[pindexx + 1].subheadernl);
                    $(mt_paragraph1).html(pgs[pindexx + 1].paragraph1nl);
                    $(mt_paragraph2).html(pgs[pindexx + 1].paragraph2nl);

                }*/
            }
            // Animation complete.
            $("#maintext").fadeIn("slow", function () {
            });
        });

    }

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        w = $(container).width();
        h = window.innerHeight * 0.6;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        renderer.setSize(w, h);

    }

    window.setTimeout(fillstart, 2000);

    self = {

        init: function (images) {

            objects = [];
            // setup the scene
            container = document.getElementById('container');


            w = $(container).width();
            h = window.innerHeight * 0.6;
            w2 = w / 2;
            h2 = h / 2;
            //container.style.width = w + "px";
            container.style.height = h + "px";
            //container.style.marginTop = 0.5 * (window.innerHeight - h) + 'px';
            clock = new THREE.Clock();

            scene = new THREE.Scene();
            projector = new THREE.Projector();
            camera = new THREE.PerspectiveCamera(50, w / h);
            camera.position.z = 400;
            camera.position.y = 0;
            scene.add(camera);
            window.camera = camera;

            // webgl renderer gives better rendering without problems
            renderer = new THREE.WebGLRenderer({
                alpha: true
            });
            renderer.setClearColor(0x000000, 0);

            renderer.setSize(w, h);

            container.appendChild(renderer.domElement);
            container.addEventListener('mousedown', onDocumentMouseDown, false);
         //   controls = new THREE.OrbitControls(camera, renderer.domElement);
         //   controls.movementSpeed = 2500;
         //   controls.rollSpeed = Math.PI / 6;
         //   controls.autoForward = false;
         //   window.controls = controls;
            // create book
            book = new FlipBook3D.Book();
            window.bkbk = book;
            book.pageWidth = pagew;
            book.pageHeight = pageh;
            visi = new THREE.MeshBasicMaterial({
                visible: false,
                transparent: true,
                side: THREE.DoubleSide

            });
            fsMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(pagew / 1.1, pageh), visi);
            fsMesh.name = "lllll";
            objects.push(fsMesh);
            fsMesh.position.set(pagew / 1.8, 0, 0);
            book.add(fsMesh);
            scene.add(fsMesh);
            fsMeshB = new THREE.Mesh(
                new THREE.PlaneGeometry(pagew / 1.1, pageh), visi);
            fsMeshB.name = "right";
            objects.push(fsMeshB);
            fsMeshB.position.set(-pagew / 1.8, 0, 0);
            scene.add(fsMeshB);
            scene.add(book);

            // create pages
            for (i = 0; i < images.length; i++) {
                texturefront = THREE.ImageUtils.loadTexture(images[i].f);
                textureback = THREE.ImageUtils.loadTexture(images[i].b);
                book.addPage(texturefront, textureback, images[i].hard);
            }

            // add flip controls
            fl = document.getElementById('arrowRight');
            fl.addEventListener('click', function () {
                poopLeft();
            });
            fr = document.getElementById('arrowLeft');
            fr.addEventListener('click', function () {
                poopRight()
            });
            // start rendering
            emailz = document.getElementById('emailz');
            var email = 'anne@broadbentmedical.com';
            var subject = 'js email';
            var body_message = 'js email';





            emailz.addEventListener('click', function () {
                var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + body_message;

                win = window.open(mailto_link, 'emailWindow');
                if (win && win.open && !win.closed) win.close();
            });
            nlnl = document.getElementById('langNL');
            nlnl.addEventListener('click', function () {
                window.nlnl = true;
                window.language = "NL";
                fillstuff(pindex);
            });
            var popo = document.getElementById('langPO');
            popo.addEventListener('click', function () {
                window.nlnl = true;
                window.language = "PO";
                fillstuff(pindex);
            });
            enen = document.getElementById('langEN');
            enen.addEventListener('click', function () {
                window.language = "EN";
                window.nlnl = false;
                fillstuff(pindex);
            });


            animate();
        },

        animate: animate
    };

    // export it
    window.FlipBook3DApplication = self;

})(window);
