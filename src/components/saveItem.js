import '../App.css'

export function SaveItem(props)
{
    console.log(props);
    return (
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
                            <p className={props.save.cpu >= 0 ? "" : "locked-lang"} id="html">
                            HTML
                            </p>
                            <p className={props.save.cpu >= 1 ? "" : "locked-lang"} id="css">
                            CSS
                            </p>
                            <p className={props.save.cpu >= 2 ? "" : "locked-lang"} id="js">
                            JS
                            </p>
                        </div>
                        <div id="config">
                            <p>CPU: <br/>{props.save.getCPU()}<span></span></p>
                            <p>GPU: <br/>{props.save.getGPU()}<span></span></p>
                            <p>RAM: <br/>{props.save.getRAM()}<span></span></p>
                            <p>STG: <br/>{props.save.getSTG()}<span></span></p>
                        </div>
                    </div>
                    <div className="grid-item save-bottom">
                        <p>{props.save.id}</p>
                        <p>LvL: {props.save.lvl}</p>
                        <p>{props.save.money}$</p>
                        <p id="playtime">
                            {props.save.getParsedTime()}
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
    )
}