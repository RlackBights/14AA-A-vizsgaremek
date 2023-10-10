export function Taskbar() {
    return (
        <div class="taskbar">
            <div class="closeBtn" onclick={() => {
                // return to room scene
            }}>
            <span
                class="iconify"
                data-icon="game-icons:ouroboros"
                style={{color: "white"}}
                data-width="45"
                data-height="45"
            ></span>
            </div>
        <div id="clock"></div>
    </div>
  );
}