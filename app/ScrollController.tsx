"use client";

import { useEffect, useRef } from "react";

const DESKTOP_BREAKPOINT = 768;
const WHEEL_THRESHOLD = 15;
const TOUCH_THRESHOLD = 48;
const ANIMATION_DURATION = 1350;
const SCROLL_DEBOUNCE = 180;
const POST_ANIMATION_LOCK = 220;

const easeInOutQuart = (t: number) =>
  t < 0.5
    ? 8 * t * t * t * t
    : 1 - Math.pow(-2 * t + 2, 4) / 2;

function shouldUseNativeScroll(
  target: EventTarget | null,
  deltaY: number,
) {
  if (!(target instanceof HTMLElement)) return false;

  const selector = [
    ".native-scroll",
    "[data-native-scroll]",
    "textarea",
    "select",
    "form",
    '[role="dialog"]',
    '[aria-modal="true"]',
  ].join(", ");

  let element: HTMLElement | null = target;

  while (element) {
    if (element.matches(selector)) {
      const canScrollDown =
        element.scrollTop + element.clientHeight < element.scrollHeight - 1;
      const canScrollUp = element.scrollTop > 1;

      if (deltaY > 0 ? canScrollDown : canScrollUp) {
        return true;
      }
    }

    element = element.parentElement;
  }

  return false;
}

export default function ScrollController() {
  const isAnimating = useRef(false);
  const currentSectionIndex = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const postAnimationLockUntil = useRef(0);
  const sections = useRef<HTMLElement[]>([]);
  const touchStartY = useRef(0);
  const touchLastY = useRef(0);
  const touchCaptured = useRef(false);

  useEffect(() => {
    sections.current = Array.from(
      document.querySelectorAll<HTMLElement>(".screen"),
    );

    if (sections.current.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const isDesktop = () => window.innerWidth > DESKTOP_BREAKPOINT;

    const nearestSectionIndex = () => {
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      sections.current.forEach((section, index) => {
        const distance = Math.abs(window.scrollY - section.offsetTop);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      return nearestIndex;
    };

    const cancelAnimation = () => {
      if (animationFrameId.current !== null) {
        window.cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }

      isAnimating.current = false;
    };

    const animateToSection = (targetIndex: number) => {
      const targetSection = sections.current[targetIndex];
      if (!targetSection) return;

      cancelAnimation();

      const startY = window.scrollY;
      const targetY = targetSection.offsetTop;
      const distance = targetY - startY;

      if (Math.abs(distance) <= 1 || prefersReducedMotion.matches) {
        window.scrollTo(0, targetY);
        currentSectionIndex.current = targetIndex;
        postAnimationLockUntil.current = performance.now() + 50;
        return;
      }

      isAnimating.current = true;
      const startTime = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / ANIMATION_DURATION, 1);
        const easedProgress = easeInOutQuart(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          animationFrameId.current = window.requestAnimationFrame(step);
          return;
        }

        window.scrollTo(0, targetSection.offsetTop);
        currentSectionIndex.current = targetIndex;
        animationFrameId.current = null;
        isAnimating.current = false;
        postAnimationLockUntil.current =
          performance.now() + POST_ANIMATION_LOCK;
      };

      animationFrameId.current = window.requestAnimationFrame(step);
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isDesktop()) return;

      if (isAnimating.current || performance.now() < postAnimationLockUntil.current) {
        event.preventDefault();
        return;
      }

      if (shouldUseNativeScroll(event.target, event.deltaY)) return;

      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) {
        event.preventDefault();
        return;
      }

      event.preventDefault();

      const actualIndex = nearestSectionIndex();
      currentSectionIndex.current = actualIndex;

      const direction = event.deltaY > 0 ? 1 : -1;
      const targetIndex = Math.min(
        Math.max(actualIndex + direction, 0),
        sections.current.length - 1,
      );

      if (targetIndex !== actualIndex) {
        animateToSection(targetIndex);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!isDesktop()) return;
      if (event.touches.length !== 1) return;

      touchStartY.current = event.touches[0].clientY;
      touchLastY.current = event.touches[0].clientY;
      touchCaptured.current = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDesktop()) return;
      if (event.touches.length !== 1) return;

      if (isAnimating.current) {
        event.preventDefault();
        return;
      }

      const currentY = event.touches[0].clientY;
      const deltaY = touchLastY.current - currentY;
      touchLastY.current = currentY;

      if (Math.abs(deltaY) < 1) return;
      if (shouldUseNativeScroll(event.target, deltaY)) return;

      const actualIndex = nearestSectionIndex();
      const currentSection = sections.current[actualIndex];
      if (!currentSection) return;

      const sectionTop = currentSection.offsetTop;
      const sectionBottom = sectionTop + currentSection.offsetHeight;
      const canScrollDownInside =
        window.scrollY + window.innerHeight < sectionBottom - 2;
      const canScrollUpInside = window.scrollY > sectionTop + 2;

      if (deltaY > 0 && canScrollDownInside) return;
      if (deltaY < 0 && canScrollUpInside) return;

      touchCaptured.current = true;
      event.preventDefault();
    };

    const handleTouchEnd = () => {
      if (!isDesktop()) return;
      if (!touchCaptured.current || isAnimating.current) {
        touchCaptured.current = false;
        return;
      }

      const gestureDelta = touchStartY.current - touchLastY.current;
      touchCaptured.current = false;

      if (Math.abs(gestureDelta) < TOUCH_THRESHOLD) return;

      const actualIndex = nearestSectionIndex();
      currentSectionIndex.current = actualIndex;

      const direction = gestureDelta > 0 ? 1 : -1;
      const targetIndex = Math.min(
        Math.max(actualIndex + direction, 0),
        sections.current.length - 1,
      );

      if (targetIndex !== actualIndex) {
        animateToSection(targetIndex);
      }
    };

    const handleScroll = () => {
      if (!isDesktop() || isAnimating.current) return;

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        if (!isDesktop() || isAnimating.current) return;

        const nearestIndex = nearestSectionIndex();
        currentSectionIndex.current = nearestIndex;
        animateToSection(nearestIndex);
      }, SCROLL_DEBOUNCE);
    };

    const handleArrowClick = (event: Event) => {
      event.preventDefault();

      if (isAnimating.current) return;

      const actualIndex = nearestSectionIndex();
      currentSectionIndex.current = actualIndex;
      animateToSection(
        Math.min(actualIndex + 1, sections.current.length - 1),
      );
    };

    const handleResize = () => {
      currentSectionIndex.current = nearestSectionIndex();
    };

    currentSectionIndex.current = nearestSectionIndex();

    const arrows = Array.from(
      document.querySelectorAll<HTMLElement>(".scroll-arrow"),
    );

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    arrows.forEach((arrow) =>
      arrow.addEventListener("click", handleArrowClick),
    );

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      arrows.forEach((arrow) =>
        arrow.removeEventListener("click", handleArrowClick),
      );

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = null;
      }

      cancelAnimation();
      sections.current = [];
    };
  }, []);

  return null;
}
