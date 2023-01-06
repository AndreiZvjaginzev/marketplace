import { useEffect } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Styles from "./ShopWidgetSettings.module.scss";

const ShopWidgetSettings = ({ currentPlace, widgetsList, setWidgetsList, widgetsPlaces, setWidgetsPlaces }) => {
  const currentWidget = findCurrentWidget()

  function findCurrentWidget() {
    let currentWidgetSettings = null;

    widgetsList.map((widget) => {
      if (widget.id === currentPlace.content.id) {
        currentWidgetSettings = widget;
      }
    });

    return currentWidgetSettings;
  }

  const closeSettings = (event) => {
    if (event) {
      if (event.target.classList.contains(Styles.Settings) || event.currentTarget.classList.contains(Styles.Settings__close) || event.currentTarget.value === 'Close') {
        setWidgetsList((widgets) => {
          return widgets.map((widget) => {
            if (widget.id === currentWidget.id) {
              return {
                ...widget,
                settingsIsOpen: false,
              };
            }
            return widget;
          });
        });
      }
    } else {
      console.error('need event')
    }
  };

  const changeThemeSetting = (theme) => {
    setWidgetsList(widgets => {
      return widgets.map(widget => {
        if(widget.id === currentWidget.id) {
          currentWidget.settings.map(setting => {
            if(setting.title === 'Theme') {
              return setting.currentValue = theme
            }
          })
          return widget
        }
        return widget
      })
    })
  }

  const bindThemeSettings = (place) => {
    if(place) {
      let setting = place.settings.map(setting => {
        if(setting.title === 'Theme') {
          return setting.currentValue
        }
      })[0]

      if(setting === 'Dark') {
        return Styles.Settings__content__view_place__dark
      } else if(setting === 'Light') {
        return Styles.Settings__content__view_place__light
      }
    }
    return ''
  }

  const changeBorderColorSetting = (borderColor) => {
    setWidgetsList(widgets => {
      return widgets.map(widget => {
        let setting = null
        if(widget.id === currentWidget.id) {
          widget.settings.map(settings => {
            if(settings.title === 'BorderColor') {
              return settings.currentValue = borderColor
            }
          })

          return widget
        }
        return widget
      })
    })
  }

  const bindBorderColorSetting = (place) => {
    let setting = null
    place.settings.map(item => {
      if(item.title === 'BorderColor') {
        setting = item.currentValue
      }
    })

    if(setting === 'Blue') {
      return Styles.Settings__content__view_place__borderColorBlue
    }
    if(setting === 'Accent') {
      return Styles.Settings__content__view_place__borderColorAccent
    }
    if(setting === 'Transparent') {
      return Styles.Settings__content__view_place__borderColorTransparent
    }
  }

  const changeDisplaySetting = (display) => {
    setWidgetsList(widgets => {
      return widgets.map(widget => {
        let setting = null
        if(widget.id === currentWidget.id) {
          widget.settings.map(setting => {
            if(setting.title === 'Display') {
              return setting.currentValue = display
            }
          })
          return widget
        }
        return widget
      })
    })
  }

  const renderParameters = () => {
    let settingsList = currentWidget.settings

    return (
      <ul className={Styles.Settings__controls__list}>
        {
          settingsList.map((item, index) => {
            if(item.title === 'Theme') {
              return (
                <li key={index} className={Styles.Settings__controls__list_item}>
                  <p className={Styles.Settings__controls__list_item_title}>{item.title}: {item.currentValue}</p>
                    {item.values.map((value, index) => {
                      return (
                        <input 
                          key={index}
                          type="button" 
                          value={value}
                          className={Styles.Settings__controls__list_item__btn} 
                          onClick={() => changeThemeSetting(item.values[index])}
                        />
                      )
                    })}
                </li>
              )
            }
            if(item.title === 'BorderColor') {
              return (
                <li key={index} className={Styles.Settings__controls__list_item}>
                  <p className={Styles.Settings__controls__list_item_title}>{item.title}: {item.currentValue}</p>
                    {item.values.map((value, index) => {
                      return (
                        <input 
                          key={index}
                          type="button" 
                          value={value}
                          className={Styles.Settings__controls__list_item__btn} 
                          onClick={() => changeBorderColorSetting(item.values[index])}
                        />
                      )
                    })}
                </li>
              )
            }
            if(item.title === 'Display') {
              return (
                <li key={index} className={Styles.Settings__controls__list_item}>
                  <p className={Styles.Settings__controls__list_item_title}>{item.title}: {item.currentValue}</p>
                    {item.values.map((value, index) => {
                      return (
                        <input 
                          key={index}
                          type="button" 
                          value={value}
                          className={Styles.Settings__controls__list_item__btn} 
                          onClick={() => changeDisplaySetting(item.values[index])}
                        />
                      )
                    })}
                </li>
              )
            }
          })
        }
      </ul>

    )
  }

  const renderWidget = () =>  currentWidget.widget

  return (
    <div className={Styles.Settings} onClick={(event) => closeSettings(event)}>
      <div className={Styles.wrapper}>
        <div className={Styles.Settings__close} onClick={(event) => closeSettings(event)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className={Styles.Settings__controls}>
          {renderParameters()}
          <input type="button" className={Styles.Settings__controls__close} value="Close" onClick={event => closeSettings(event)}/>
        </div>
        <div className={Styles.Settings__content}>
          <h3 className={Styles.Settings__content_title}>
            {currentPlace.content.title}
          </h3>
          <div className={Styles.Settings__content__view}>
            <div className={`${Styles.Settings__content__view_place} ${bindThemeSettings(currentWidget)} ${bindBorderColorSetting(currentWidget)}`}>
              {renderWidget()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopWidgetSettings;
