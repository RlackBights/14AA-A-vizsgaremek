export function openSaves() {
    document.getElementsByClassName("save-container")[0].style.display = "flex";
    document.getElementById("save-back-button").style.display = "unset";
    document.getElementById("login-container").style.pointerEvents = "none";
  }
  
export function closeSaves() {
    document.getElementsByClassName("save-container")[0].style.display = "none";
    document.getElementById("save-back-button").style.display = "none";
  }
  
  
export function refreshSaves(save1, save2, save3) {
    let saveSlot1 = document.getElementById("save-item1");
    let saveSlot2 = document.getElementById("save-item2");
    let saveSlot3 = document.getElementById("save-item3");
  
    try {
      if (save1.lvl === -1) {
        if (!saveSlot1.classList.contains("empty-save")) {
          saveSlot1.classList.add("empty-save");
        }
      } else {
        if (saveSlot1.classList.contains("empty-save")) {
          saveSlot1.classList.remove("empty-save");
        }
      }
    
      if (save2.lvl === -1) {
        if (!saveSlot2.classList.contains("empty-save")) {
          saveSlot2.classList.add("empty-save");
        }
      } else {
        if (saveSlot2.classList.contains("empty-save")) {
          saveSlot2.classList.remove("empty-save");
        }
      }
    
      if (save3.lvl === -1) {
        saveSlot3.classList.add("empty-save");
      } else {
        saveSlot3.classList.remove("empty-save");
      }
    } catch {
      return;
    }
  }