import { useEffect, useRef } from "react"
import * as THREE from 'three'

const ThreeDemo = () => {
    let domRef:any = useRef(null)

    useEffect(() => {
        // 创建场景对象Scene
        let scene = new THREE.Scene();
        // 创建网格模型
        // let geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        let geometry = new THREE.BoxGeometry(50, 100, 100); //创建一个立方体几何对象Geometry
        // 材质对象Material
        let material = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        scene.add(mesh); //网格模型添加到场景中

        // 圆柱网格模型
        let geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
        let material3 = new THREE.MeshLambertMaterial({
            color: 0xffff00,
            opacity:0.3,
            wireframe:true,
            transparent:true
        });
        // let material3=new THREE.MeshPhongMaterial({
        //     color:0x0000ff,
        //     specular:0x4488ee,
        //     shininess:12
        // });//材质对象
        let mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
        mesh3.position.set(100,0,0);//设置mesh3模型对象的xyz坐标为120,0,0
        scene.add(mesh3); //

        //点光源
        let point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        let ambient = new THREE.AmbientLight(0xff0000);
        scene.add(ambient);
    
        // 相机设置
        let width = window.innerWidth; //窗口宽度
        let height = window.innerHeight; //窗口高度
        let k = width / height; //窗口宽高比
        let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
     
        // 创建渲染器对象
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);//设置渲染区域尺寸
        renderer.setClearColor(0x666666, 1); //设置背景颜色
        domRef.current && domRef.current.appendChild(renderer.domElement); //body元素中插入canvas对象
        let T0 = new Date().getTime();//上次时间
        // 渲染函数
        function render() {
            let T1 = new Date().getTime();//本次时间
            let t = T1-T0;//时间差
            T0 = T1;//把本次时间赋值给上次时间
            requestAnimationFrame(render);
            renderer.render(scene,camera);//执行渲染操作
            mesh.rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
        }
        //执行渲染操作   指定场景、相机作为参数
        render()
        // renderer.render(scene, camera);
    },[])

    return <div ref={domRef} className="three-container">

    </div>
}

export default ThreeDemo