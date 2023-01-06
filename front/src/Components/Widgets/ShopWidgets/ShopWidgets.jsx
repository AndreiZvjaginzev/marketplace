import { useState, useEffect, useRef } from "react";
import { faGrip, faXmark, faCheckToSlot, faArrowRightArrowLeft, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShopWidgetSettings from "../ShopWidgetSettings/ShopWidgetSettings";
import GraphOrders from "../GraphOrdersWidget/GraphOrdersWidget";
import WidgetLinksShop from "../WidgetLinksShop/WidgetLinksShop";

import Requests from "../../Requests";

import Styles from "./ShopWidgets.module.scss";

let widgetPlaces = [
  {id: 1, content: null},
  {id: 2, content: null},
  {id: 3, content: null},
  {id: 4, content: null},
]

function ShopWidgets({user}) {
  const placesRef = useRef();
  const [widgetsList, setWidgetsList] = useState([]);
  const [widgetsPlaces, setWidgetsPlaces] = useState(widgetPlaces);
  const [currentWidget, setCurrentWidget] = useState(null);
  const [isActiveChange, setIsActiveChange] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);

  const sortList = (a, b) => (a.order > b.order ? 1 : -1);

  useEffect(() => {
    Requests({
      method: 'get',
      url: '/widgets',
      callback: getWidgets
    });
  }, [])

  const replaceResponseWidget = (widgets) => {
    let responsePlaces = JSON.parse(user.widgets_places);
    widgets.map(widget => {
      setWidgetsPlaces(currentPlaces => {
        return currentPlaces.map(currentPlace => {
          let completedPlace = null
          if(responsePlaces) {
            responsePlaces.map(responsePlace => {
              if(responsePlace.content) {
                if(responsePlace.content.id === widget.id) {
                  if(responsePlace.id === currentPlace.id) {
                    completedPlace = {...currentPlace, content: widget}
                    widget.settings.forEach(widgetSettings => {
                      responsePlace.content.settings.forEach(responseSettings => {
                        if(responseSettings.id === widgetSettings.id) {
                          completedPlace.content.settings.forEach(completedPlaceSettings => {
                            if(completedPlaceSettings.id === responseSettings.id) {
                              completedPlaceSettings.currentValue = responseSettings.currentValue;
                            }
                          })
                        }
                      })
                    })
                  }
                }
                setWidgetsList(widgets => {
                  return widgets.map(item => {
                    if(responsePlace.content.id === item.id) {
                      return {
                        ...item,
                        isActive: true
                      }
                    }
                    return item
                  })
                })
              }
            })
          }

          
          if(completedPlace) {
            return completedPlace
          }
          return currentPlace
        })
      })
    })

  }

  function getWidgets(response) {
    setWidgetsList(response);
    replaceResponseWidget(response);
  }

  function showEmptyPlaces(places) {
    let index = 1;

    for(let element of placesRef.current.children) {
      places.forEach(place => {
        if(place.id === index) {
          if(!place.content) {
            element.classList.add(Styles.isEmpty);
          }
        }
      })
      index++
    }
  }

  function hideEmptyPlaces(places) {
    let index = 1;

    for(let element of placesRef.current.children) {
      places.forEach(place => {
        if(place.id === index) {
          element.classList.remove(Styles.isEmpty);
        }
      })
      index++
    }
  }

  const findAndTransformWidget = () => {
    let widgetSelected = null;
    widgetsList.map((widget) => {
      if (currentWidget && widget.id === currentWidget.id) {
        widgetSelected = widget;
      }
    });
    return widgetSelected;
  };

  const showPlaceContent = (place) => {
    let widgetPlaced = null;
    if (place.content !== null && widgetsList.length !== 0) {
      widgetsList.map((widget) => {
        if (place.content.id === widget.id) {
          if(widget.title === 'Orders') {
            widget.widget = <GraphOrders />
          }
          if(widget.title === 'Links') {
            widget.widget = <WidgetLinksShop place={place}/>
          }
          widgetPlaced = widget;
        }
      });

      return widgetPlaced.widget;
    }

    return null;
  };

  const toggleShowSettingsWidget = (place) => {
    setWidgetsList(widgets => { 
      return widgets.map(widget => {
        if(widget.settings) {
          if(widget.id === place.content.id) {
            return {
              ...widget,
              settingsIsOpen: !widget.settingsIsOpen
            }
          }
        }
        return widget
      })
    })
  }

  const settingsWidget = (item) => {
    let settings = null

    if(item.content) {
      widgetsList.map(widget => {
        if(item.content.id === widget.id) {
          if(widget.settingsIsOpen) {
            settings = 
              <ShopWidgetSettings 
                currentPlace={item} 
                widgetsList={widgetsList} 
                setWidgetsList={setWidgetsList}
                widgetsPlaces={widgetsPlaces}
                setWidgetsPlaces={setWidgetsPlaces}
              />
          }
        }
      })
    }

    return settings
  }

  const deleteFromPlace = (event, item) => {
    setWidgetsPlaces((places) => {
      return places.map((place) => {
        if (place.id === item.id) {
          setWidgetsList((widgets) => {
            return widgets.map((widget) => {
              if (widget.id === place.content.id) {
                return {
                  ...widget,
                  isActive: false,
                };
              } else {
                return widget;
              }
            });
          });
          return {
            ...place,
            content: null,
          };
        } else {
          return place;
        }
      });
    });
  };

  const onReplaceText = (item) => {
    let result = findAndTransformWidget();

    const onReplaceStatus = () => {
      if (result && item.content) {
        if (result.id === item.content.id) {
          return <p>Nothing to replace</p>;
        } else {
          return (
            <>
              <p>Replace widgets</p>
              <div>
                {result !== null ? result.title : null}
                <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                {item.content !== null ? item.content.title : null}
              </div>
            </>
          );
        }
      }
    };

    return (
      <div className={Styles.widgets_place__replace}>{onReplaceStatus()}</div>
    );
  };

  const replaceWidget = (item) => {
    let selectedWidget = null;

    widgetsPlaces.map((place) => {
      if (place.content) {
        if (place.content.id === currentWidget.id) {
          setWidgetsPlaces((widgetsPlace) => {
            return widgetsPlace.map((place) => {
              if (place.content) {
                if (place.content.id === currentWidget.id) {
                  return {
                    ...place,
                    content: null,
                  };
                } else {
                  return place;
                }
              }
              return place;
            });
          });
        }
      }
    });

    setWidgetsPlaces((places) => {
      return places.map((place) => {
        widgetsList.map((widget) => {
          if (widget.id === currentWidget.id) {
            selectedWidget = widget;
          }
        });

        if (place.id === item.id) {
          return {
            ...place,
            content: selectedWidget,
          };
        }
        return place;
      });
    });
  };

  const setActiveStatus = () => {
    setWidgetsList((widgetsInList) => {
      return widgetsInList.map((widget) => {
        if (widget.id === currentWidget.id) {
          return {
            ...widget,
            isActive: true,
          };
        } else {
          return widget;
        }
      });
    });
  };

  const onDragStart = (event, item) => {
    if (item.content === null) {
      setCurrentWidget(null);
    }
    if (item.widget) {
      setCurrentWidget({ id: item.id });
    }

    showEmptyPlaces(widgetsPlaces);
  };

  const onDragOver = (event, item) => {
    event.preventDefault();

    if (
      event.currentTarget.classList.contains(Styles.widgets_place) &&
      currentWidget !== null &&
      !item.content
    ) {
      event.currentTarget.classList.add(Styles.active);
    }

    if (
      event.currentTarget.classList.contains(Styles.widgets_place) &&
      currentWidget !== null &&
      item.content
    ) {
      event.currentTarget.classList.add(Styles.active_replace);
    }
  };

  const onDragLeave = (event, item) => {
    if (event.target.classList.contains(Styles.widgets_place)) {
      event.target.classList.remove(Styles.active);
    }

    if (
      event.currentTarget.classList.contains(Styles.widgets_place) &&
      currentWidget !== null &&
      item.content
    ) {
      event.currentTarget.classList.remove(Styles.active_replace);
    }
  };

  const onDragEnd = (event) => {
    if (event.currentTarget.classList.contains(Styles.widgets_place)) {
      event.target.classList.remove(Styles.active);
    }

    hideEmptyPlaces(widgetPlaces);
    setCurrentWidget(null);
  };

  const replaceWidgetOnPlaces = (item) => {
    setWidgetsPlaces((places) => {
      return places.map((place) => {
        if (place.content) {
          if (place.content.id === currentWidget.id) {
            if (place.id === item.id) {
              return place;
            } else {
              return {
                ...place,
                content: null,
              };
            }
          }
        }
        return place;
      });
    });
  };

  const onDrop = (event, item) => {
    event.preventDefault();
    let widgetSelected = null;

    if (currentWidget === null) return;

    if (event.currentTarget.classList.contains(Styles.widgets_list_item)) {
      widgetSelected = findAndTransformWidget();

      setWidgetsList((widgets) => {
        return widgets.map((widgetItem) => {
          if (widgetItem.id === currentWidget.id) {
            return {
              ...widgetItem,
              order: item.order,
            };
          }

          if (widgetItem.id === item.id) {
            return {
              ...widgetItem,
              order: widgetSelected.order,
            };
          }

          return widgetItem;
        });
      });
    }

    if (event.currentTarget.classList.contains(Styles.widgets_place) && item.content === null) {
      event.target.classList.remove(Styles.active);

      setWidgetsPlaces((places) => {
        return places.map((place) => {
          if (place.id === item.id) {
            setActiveStatus();
            return {
              ...place,
              content: currentWidget,
            };
          } else {
            return place;
          }
        });
      });

      replaceWidget(item);
    }

    if (event.currentTarget.classList.contains(Styles.widgets_place) && currentWidget !== null && item.content) {
      event.currentTarget.classList.remove(Styles.active_replace);

      widgetSelected = findAndTransformWidget();

      setWidgetsPlaces((places) => {
        return places.map((place) => {
          if (item.id === place.id) {
            setWidgetsList((widgets) => {
              return widgets.map((widget) => {
                if (widget.id === place.content.id) {
                  return widget;
                }
                if (widget.id === currentWidget.id) {
                  setWidgetsList((widgets) => {
                    return widgets.map((widget) => {
                      if (widget.id === place.content.id) {
                        return {
                          ...widget,
                          isActive: false,
                        };
                      }
                      return widget;
                    });
                  });
                  return {
                    ...widget,
                    isActive: true,
                  };
                }

                return widget;
              });
            });
            return {
              ...place,
              content: widgetSelected,
            };
          }
          return place;
        });
      });

      replaceWidgetOnPlaces(item);
    }

    setCurrentWidget(null);
  };

  const bindThemeSetting = (place) => {
    if(place.content) {
      let setting = null;
      place.content.settings.map(item => {
        if(item.title === 'Theme') {
          setting = item.currentValue
        }
      })
      
      if(setting === 'Dark') {
        return Styles.widgets_place__dark
      } else if(setting === 'Light') {
        return Styles.widgets_place__light
      }
    }
  }

  const bindBorderColorSetting = (place) => {
    if(place.content) {
      let setting = null
      place.content.settings.map(item => {
        if(item.title === 'BorderColor') {
          setting = item.currentValue
        }
      })
      
      if(setting === 'Blue') {
        return Styles.widgets_place__borderColorBlue
      }
      if(setting === 'Accent') {
        return Styles.widgets_place__borderColorAccent
      }
      if(setting === 'Transparent') {
        return Styles.widgets_place__borderColorTransparent
      }
    }
  }

  const sendPlacesContent = () => {
    widgetsPlaces.map(item => {
      if(item.content) {
        item.content.isActive = true
        item.content.widget = null
      }
    })

    Requests({
      method: 'post',
      url: '/post-places-shop',
      data: {widgets_places: JSON.stringify(widgetsPlaces)},
      callback: responseStatusOfPlaces
    })
  }

  function responseStatusOfPlaces(response) {
    if(response) {
      setResponseStatus(response)
    }

    setTimeout(() => {
      setResponseStatus(false)
    }, 1500)
  }

  const renderWidgetsList = () => {
    return (
      <div className={Styles.widgets_list}>
        <div className={Styles.widgets_list__save} onClick={() => {setIsActiveChange(false); sendPlacesContent()}}>Save</div>
        {widgetsList.sort(sortList).map((widget) => {
          return (
            <div
              key={widget.id}
              className={Styles.widgets_list_item}
              draggable={true}
              onDragStart={(event) => onDragStart(event, widget)}
              onDragOver={(event) => onDragOver(event, widget)}
              onDragLeave={(event) => onDragLeave(event, widget)}
              onDragEnd={(event) => onDragEnd(event)}
              onDrop={(event) => onDrop(event, widget)}
            >
              <FontAwesomeIcon icon={faGrip} />
              <p>{widget.title}</p>
              <FontAwesomeIcon
                icon={faCheckToSlot}
                className={`${Styles.widgets_list_item__check} ${
                  widget.isActive ? Styles.active : ""
                }`}
              />
            </div>
          );
        })}
      </div>
    )
  }

  const renderWidgetsControllPanel = () => {
    return (
      <div className={Styles.controllPanel}>
        {
          responseStatus ? 
            <div className={Styles.controllPanel__saved}>{responseStatus.status}</div> 
          : 
            <div className={Styles.controllPanel__editBtn} onClick={() => setIsActiveChange(true)}>Edit widgets</div>
        }
      </div>
    )
  }

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.widgets} ref={placesRef}>
        {widgetsPlaces.map((place) => {
          return (
            <div
              key={place.id}
              className={`${Styles.widgets_place} ${bindThemeSetting(place)} ${bindBorderColorSetting(place)}`}
              onDragStart={(event) => onDragStart(event, place)}
              onDragOver={(event) => onDragOver(event, place)}
              onDragLeave={(event) => onDragLeave(event, place)}
              onDragEnd={(event) => onDragEnd(event)}
              onDrop={(event) => onDrop(event, place)}
            >
              {onReplaceText(place)}
              {showPlaceContent(place)}
              {settingsWidget(place)}
              {place.content !== null && isActiveChange ? (
                <div>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={Styles.widgets_place__delete}
                    onClick={(event) => deleteFromPlace(event, place)}
                  />
                  <FontAwesomeIcon
                    icon={faWrench}
                    className={`${Styles.widgets_place__edit} ${Styles.opacity}`}
                    onClick={(event) => toggleShowSettingsWidget(place)}
                  />
                </div>
              ) : null}
              {place.content !== null && isActiveChange ? (
                <span className={`${Styles.widgets_place__id} ${Styles.opacity}`}>id: {place.content.id}</span>
              ) : null}
            </div>
          );
        })}
      </div>
      {isActiveChange ? renderWidgetsList() : renderWidgetsControllPanel()}
    </div>
  );
}

export default ShopWidgets;
