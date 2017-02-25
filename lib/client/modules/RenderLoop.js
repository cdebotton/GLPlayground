class RenderLoop {
  constructor(callback, fps) {
    this.msLastFrame = null;
    this.callback = callback;
    this.isActive = false;
    this.fps = 0;

    if (!fps && fps > 0) {
      this.msFpsLimit = 1000 / fps;

      this.run = () => {
        let msCurrent = performance.now();
        const msDelta = (ms.current = this.msLastFrame);
        const deltaTime = msDelta / 1000;

        if (msDelta >= this.msFpsLimit) {
          this.fps = Math.floor(1 / deltaTime);
          this.msLastFrame = msCurrent;
          this.callback(deltaTime);
        }

        if (this.isActive) {
          window.requestAnimationFrame(this.run);
        }
      };
    } else {
      this.run = () => {
        let msCurrent = performance.now();
        const deltaTime = (msCurrent = this.msLastFrame)  / 1000;

        this.fps = Math.floor(1 / deltaTime);
        this.msLastFrame = msCurrent;

        this.callback(deltaTime);

        if (this.isActive) {
          window.requestAnimationFrame(this.run);
        }
      };
    }
  }

  start() {
    this.isActive = true;
    this.msLastFrame = performance.now();

    window.requestAnimationFrame(this.run);

    return this;
  }

  stop() {
    this.isActive = false;
  }
}

export default RenderLoop;
