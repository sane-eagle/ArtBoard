"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/lib/constants";
import { ReduxState } from "@/lib/redux/types";
import { changeBrushSize, changeColor } from "@/lib/redux/toolboxSlice";
import cx from "classnames";
import { getSocket } from "@/lib/socket";

const Toolbox = () => {
  const dispatch = useDispatch();
  const socket = getSocket(); // ✅ SAFE (null in static deploy)

  const activeMenuItem = useSelector(
    (state: ReduxState) => state.menu.activeMenuItem
  );
  const { color, size } = useSelector(
    (state: ReduxState) => state.toolbox[activeMenuItem]
  );

  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;

  const updateBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    dispatch(changeBrushSize({ item: activeMenuItem, size: newSize }));
    socket?.emit("changeConfig", { color, size: newSize });
  };

  const updateColor = (newColor: string) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
    socket?.emit("changeConfig", { color: newColor, size });
  };

  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOption && (
        <div className={styles.toolboxItem}>
          <h4 className={styles.toolboxText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            {Object.keys(COLORS).map((key) => {
              const currentColor =
                COLORS[key as keyof typeof COLORS];

              return (
                <div
                  key={key}
                  className={cx(styles.colorBox, {
                    [styles.active]: color === currentColor,
                  })}
                  style={{ backgroundColor: currentColor }}
                  onClick={() => updateColor(currentColor)}
                />
              );
            })}
          </div>
        </div>
      )}

      {showBrushToolOption && (
        <div className={styles.toolboxItem}>
          <h4 className={styles.toolboxText}>Brush Size</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={updateBrushSize}
              value={size}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbox;