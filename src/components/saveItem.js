import '../App.css'

export function SaveItem()
{
    return (
        <div className="save-container" style={{ display: "flex" }}>
            <div className="save-item-container">
                <div
                    className="save-item"
                    id="save-item1"
                    onClick={() => {
                    }}
                >
                    <div className="empty-save-base">
                        <p>Empty save</p>
                        <p>
                            <i>-- slot 1 --</i>
                        </p>
                    </div>
                    <div className="grid-item save-top">
                        <div id="langs">
                            <p className={/* SAVE GETCPU */0 >= 0 ? "" : "locked-lang"} id="html">
                            HTML
                            </p>
                            <p className={/* SAVE GETCPU */0 >= 1 ? "" : "locked-lang"} id="css">
                            CSS
                            </p>
                            <p className={/* SAVE GETCPU */0 >= 2 ? "" : "locked-lang"} id="js">
                            JS
                            </p>
                        </div>
                        <div id="config">
                            <p>CPU: <span></span></p>
                            <p>GPU: <span></span></p>
                            <p>RAM: <span></span></p>
                            <p>STG: <span></span></p>
                        </div>
                    </div>
                    <div className="grid-item save-bottom">
                        <p>LvL: </p>
                        <p>$</p>
                        <p id="playtime">
                            0:0:0
                        </p>
                    </div>
                </div>
                <button
                    className="delete-button"
                    id="delete-button1"
                    onClick={() => {}}
                >
                    <span>Delete</span>
                </button>
            </div>
        </div>
    )
}