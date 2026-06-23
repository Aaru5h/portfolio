"use client";

import { useEffect, useRef } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4";

export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const videoEl = videoRef.current;
    if (!canvas || !videoEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frames: ImageBitmap[] = [];
    let framesReady = false;
    let lastFrameIndex = -1;
    let videoSeeking = false;
    let active = true;

    function resizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      lastFrameIndex = -1;
    }

    async function extractFrames() {
      try {
        const response = await fetch(VIDEO_URL, { mode: "cors" });
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        const video = document.createElement("video");
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = "anonymous";
        video.preload = "auto";
        video.src = objectUrl;

        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => resolve();
          video.onerror = () => reject();
          setTimeout(() => reject(), 15000);
        });

        const scale = Math.min(1, 1280 / video.videoWidth);
        const scaledWidth = Math.round(video.videoWidth * scale);
        const scaledHeight = Math.round(video.videoHeight * scale);
        const frameCount = Math.max(30, Math.min(120, Math.round(video.duration * 24)));

        for (let i = 0; i < frameCount; i++) {
          if (!active) break;
          const time = (i / (frameCount - 1)) * (video.duration - 0.05);
          video.currentTime = time;
          await new Promise<void>((resolve, reject) => {
            const onSeeked = () => {
              video.removeEventListener("seeked", onSeeked);
              resolve();
            };
            video.addEventListener("seeked", onSeeked);
            setTimeout(() => {
              video.removeEventListener("seeked", onSeeked);
              reject();
            }, 3000);
          });
          const bitmap = await createImageBitmap(video, {
            resizeWidth: scaledWidth,
            resizeHeight: scaledHeight,
          });
          frames.push(bitmap);
        }

        if (frames.length > 0 && active && canvas) {
          framesReady = true;
          canvas.style.visibility = "visible";
          if (videoEl) videoEl.style.display = "none";
        }
        URL.revokeObjectURL(objectUrl);
      } catch (e) {
        // fallback to video seeking
      }
    }

    function getScrollBounds() {
      const vh = window.innerHeight;
      return {
        start: vh * 0.5,
        end: document.documentElement.scrollHeight - vh,
      };
    }

    function getProgress() {
      const { start, end } = getScrollBounds();
      const range = end - start;
      if (range <= 0) return 0;
      return Math.max(0, Math.min(1, (window.scrollY - start) / range));
    }

    function drawFrame(frame: ImageBitmap) {
      if (!canvas || !ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / frame.width, ch / frame.height);
      const dw = frame.width * s;
      const dh = frame.height * s;
      ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }

    let animationFrameId: number;

    function videoTick() {
      if (!active) return;
      const progress = getProgress();
      if (framesReady && frames.length > 0) {
        const idx = Math.round(progress * (frames.length - 1));
        if (idx !== lastFrameIndex) {
          lastFrameIndex = idx;
          if (frames[idx]) drawFrame(frames[idx]);
        }
      } else if (
        videoEl &&
        videoEl.duration &&
        isFinite(videoEl.duration) &&
        videoEl.readyState >= 1
      ) {
        const target = progress * videoEl.duration;
        if (!videoSeeking && Math.abs(videoEl.currentTime - target) > 0.001) {
          videoSeeking = true;
          videoEl.currentTime = target;
        }
      }
      animationFrameId = requestAnimationFrame(videoTick);
    }

    const handleSeeked = () => {
      videoSeeking = false;
    };
    const handleStalled = () => {
      videoSeeking = false;
    };
    const handleLoadedData = () => {
      if (videoEl) videoEl.currentTime = 0;
    };

    videoEl.addEventListener("seeked", handleSeeked);
    videoEl.addEventListener("stalled", handleStalled);
    videoEl.addEventListener("loadeddata", handleLoadedData);
    canvas.style.visibility = "hidden";

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationFrameId = requestAnimationFrame(videoTick);
    extractFrames();

    return () => {
      active = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      if (videoEl) {
        videoEl.removeEventListener("seeked", handleSeeked);
        videoEl.removeEventListener("stalled", handleStalled);
        videoEl.removeEventListener("loadeddata", handleLoadedData);
      }
    };
  }, []);

  return (
    <div
      id="scroll-video-container"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        background: "#0a0a0a",
        top: "-20%",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <video
        ref={videoRef}
        id="video-fallback"
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        src={VIDEO_URL}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
        }}
      />
    </div>
  );
}
