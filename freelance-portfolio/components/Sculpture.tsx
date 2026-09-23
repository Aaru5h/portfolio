"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export default function Sculpture() {
  const host = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [chrome, setChrome] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0, 10.5);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.TorusKnotGeometry(1.45, 0.47, 240, 36, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: "#ed4c16",
      metalness: 0.68,
      roughness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.17,
      envMapIntensity: 1.4,
    });
    materialRef.current = material;
    const knot = new THREE.Mesh(geometry, material);
    knot.rotation.set(0.25, -0.45, -0.5);
    group.add(knot);
    const silver = new THREE.MeshPhysicalMaterial({
      color: "#e7e4dd",
      metalness: 1,
      roughness: 0.15,
    });
    const sphereGeometry = new THREE.SphereGeometry(0.19, 32, 24);
    const bead = new THREE.Mesh(sphereGeometry, silver);
    bead.position.set(2.35, 1.3, 0);
    group.add(bead);
    const light = new THREE.DirectionalLight(0xffffff, 4);
    light.position.set(-3, 4, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pointer = { x: 0, y: 0 };
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      pointer.x = ((e.clientX - b.left) / b.width - 0.5) * 0.55;
      pointer.y = ((e.clientY - b.top) / b.height - 0.5) * 0.4;
    };
    const leave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    resize();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    pausedRef.current = reduced.matches;
    setPaused(reduced.matches);
    const preference = () => {
      pausedRef.current = reduced.matches;
      setPaused(reduced.matches);
    };
    reduced.addEventListener("change", preference);
    let inView = true;
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    visibility.observe(el);
    let frame = 0,
      elapsed = 0,
      previous = performance.now();
    function render(now: number) {
      frame = requestAnimationFrame(render);
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!inView || document.hidden) return;
      if (!pausedRef.current) {
        elapsed += delta;
        knot.rotation.y += delta * 0.12;
        group.position.y = Math.sin(elapsed * 0.65) * 0.1;
        group.rotation.x += (pointer.y - group.rotation.x) * 0.045;
        group.rotation.y += (pointer.x - group.rotation.y) * 0.045;
        bead.position.y = 1.3 + Math.sin(elapsed) * 0.22;
      }
      renderer.render(scene, camera);
    }
    frame = requestAnimationFrame(render);
    const contextLost = (e: Event) => {
      e.preventDefault();
      setFailed(true);
      cancelAnimationFrame(frame);
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      reduced.removeEventListener("change", preference);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      geometry.dispose();
      sphereGeometry.dispose();
      material.dispose();
      silver.dispose();
      environment.dispose();
      room.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      materialRef.current = null;
    };
  }, []);
  function changeMaterial(value: boolean) {
    setChrome(value);
    if (materialRef.current) {
      materialRef.current.color.set(value ? "#c9cbd0" : "#ed4c16");
      materialRef.current.metalness = value ? 1 : 0.68;
      materialRef.current.roughness = value ? 0.16 : 0.24;
    }
  }
  return (
    <div className="sculpture-wrap">
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <span className="object-note note-top">
        A little creative engineering.
      </span>
      <div
        ref={host}
        className="sculpture"
        role="img"
        aria-label="Interactive sculptural knot in orange or polished chrome, slowly rotating in three dimensions"
      />
      {failed && (
        <div className="sculpture-fallback" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
      <div className="sculpture-shadow" aria-hidden="true" />
      <div className="object-caption">
        <span className="tiny-cross" aria-hidden="true">
          +
        </span>{" "}
        Ideas take shape here.
      </div>
      {!failed && (
        <div className="sculpture-controls">
          <div className="swatches" aria-label="Sculpture material">
            <button
              className="swatch orange"
              aria-label="Orange material"
              aria-pressed={!chrome}
              onClick={() => changeMaterial(false)}
            />
            <button
              className="swatch silver"
              aria-label="Chrome material"
              aria-pressed={chrome}
              onClick={() => changeMaterial(true)}
            />
          </div>
          <span className="control-divider" />
          <button
            className="motion-toggle"
            onClick={() => {
              pausedRef.current = !paused;
              setPaused(!paused);
            }}
            aria-label={
              paused ? "Play sculpture animation" : "Pause sculpture animation"
            }
          >
            {paused ? (
              <svg viewBox="0 0 20 20">
                <path d="m7 4 9 6-9 6Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20">
                <path d="M7 5v10M13 5v10" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
