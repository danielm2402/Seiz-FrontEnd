
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';


const styles = theme => ({
  rootCounter: {
    flexGrow: 1,
  },
  rootCounterFull: {
    flexGrow: 1,
  },
  rootContact: {
    flexGrow: 1,
    width: '100%',
  
    overflow: 'hidden',
    '& header + div': {
      padding: '8px !important'
    }
  },
  divider: {
    
    display: 'block'
  },
  dividerBig: {
   
  },
  centerItem: {},
  
  leftIcon: {
    
  },
  secondaryWrap: {
   
    borderRadius: 4,
    justifyContent: 'space-around',
    '& > $centerItem': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& li': {
      marginBottom: 30
    },
    '& $chip': {
      top: 50,
      position: 'absolute',
      fontSize: 11,
      fontWeight: 400,
    }
  },
  bigResume: {
   
    justifyContent: 'space-between',
    display: 'flex',
    
    '& li': {
     
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
     
    '& $avatar': {
      
    }
  },
  sm: {},
  mc: {},
  avatar: {
   
    '& svg': {
      fontSize: 24
    },
    '&$sm': {
      width: 30,
      height: 30
    },
    '&$mc': {
      width: 24,
      height: 24,
      top: 12,
      left: 8,
      marginRight: 0
    },
  },

  


  root: {
    width: '100%',
   
    overflowX: 'auto',
  },
  chip: {
    margin: '8px 0 8px auto',
    color: '#FFF'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  textCenter: {
    textAlign: 'center'
  },
  textRight: {
    textAlign: 'right'
  },
  red: {},
  orange: {},
  indigo: {},
  purple: {},
  lime: {},
  taskIcon: {
    display: 'block',
    textAlign: 'center',
    margin: '0 10px',
    
  },
  productPhoto: {
   
  },
  done: {},
  listItem: {
    padding: 5,
    
    '&:hover': {
     
    },
    '&$done': {
      textDecoration: 'line-through'
    }
  },
  title: {},
  subtitle: {},
 
  },
  progressWidget: {
    marginTop: 20,
    
    '& div': {
     
    }
  },
  chipProgress: {
    marginTop: 20,
   
    '& div': {
     
      
    }
  },
  taskStatus: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      
    }
  },
  counterIcon: {
    
    opacity: 0.7,
    fontSize: 84
  },
  progressCircle: {
    borderRadius: '50%',
    
  },
  itemCarousel: {
    textAlign: 'center',
    '& img': {
      margin: '10px auto'
    }
  },
  albumRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    
  },
  gridList: {
    height: 'auto',
   
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  img: {
    maxWidth: 'none'
  },
  mapWrap: {
    position: 'relative',
    overflow: 'hidden',
    
  },
  address: {
    display: 'block'
  },
  carouselItem: {
    margin: '0 5px',
   
    overflow: 'hidden',
    height: 380,
    padding: '60px 20px',
    position: 'relative'
  },
  iconBg: {

    opacity: 0.25,
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 96
  },
  carouselTitle: {
  
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 500,
    fontSize: 20,
  
  },
  carouselDesc: {
  
  },
  chartWrap: {
    overflow: 'auto',
   
  },
  chartFluid: {
    width: '100%',
    minWidth: 400,
    height: 300,
    
  },
  tabNotif: {
    '& > span': {
      top: -5,
      right: -30
    }
  },
  button: {
 
  },
  wrapperDate: {
    overflow: 'hidden',

  },
  calendarWrap: {
  
    zIndex: 1,
  
    '& > div': {
      border: 'none',
      background: 'none',
      width: 'auto',
      color: '#FFF',
     
      '& button': {
        fontSize: 12,
      
        color: 'white',
        '&[class*="navigation__label"]': {
          fontSize: 18
        },
        '&[class*="tile--active"]': {
        
        },
        '&[class*="tile--now"]': {
       
        },
        '&[class*="__year-view"]': {
          padding: '1em 0.5em',
          margin: '2px 0'
        },
        '&[class*="__day--weekend"] time': {
       
        },
        '&[class*="__day--neighboringMonth"]': {
          color: 'rgba(255,255,255,0.5)'
        },
        '&:hover': {
     
        },
        '&:focus': {
          background: 'none !important',
        
        }
      },
      '& div[class*="__navigation"] button': {
        minWidth: 0,
     
        height: 'auto'
      }
    }
  },
  clockWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
   
    '& > time': {
      borderRadius: '50%',
      '& > div': {
       
        border: 'none',
      }
    },
    '& [class*="__mark__body"], [class*="__hand__body"]': {
    
    }
  },
  today: {
    fontSize: 18,
   
  },
  storageInfo: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    '& li': {
      
    }
  },
  buttonReadMore: {
    borderColor: '#FFF',
    color: '#FFF',
   
  },
  sliderWrap: {
    height: 360,
    overflow: 'hidden',
    '& $title': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }
  },
  sliderContent: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    boxShadow: 'none'
  },
  mobileStepper: {
  
    textAlign: 'center',
    borderRadius: '0 0 12px 12px',
    
  },
  downloadInvoice: {
    fontSize: 11,
   
    textDecoration: 'none',
    '& svg': {
      width: '0.5em'
    }
  },
  messages: {
    '& p': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }
  },
  rootCalculator: {
    width: '100%',
    height: 420,
    
  },
  stripped: {
    '& tbody tr:nth-child(even)': {
     
    }
  },
  activityWrap: {
    '& ul:before': {
      content: '""',
      position: 'absolute',
      height: '100%',
      left: -2,
     
      
    }
  },
  activityList: {
    
    paddingRight: 0,
    position: 'relative',
 
  },
  activityText: {
   
    '& span': {
      fontSize: 12,
      
    }
  },
  timeDot: {
    position: 'relative',
    '& span': {
      
      width: 15,
      height: 15,
      borderRadius: '50%',
      position: 'absolute',
      
      top: 0,
      left: -8,
     
    },
    '& time': {
      fontSize: 12,
      textAlign: 'left',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      display: 'block',
      
    }
  },
  formControl: {
    width: '100%',
   
  },
  formControlTrade: {
    width: '100%',
   
  },
  tradeUp: {
    color: green[500],
    '& svg': {
      fill: green[500],
    }
  },
  tradeDown: {
    color: red[500],
    '& svg': {
      fill: red[500],
    }
  },
  tradeFlat: {
    
  },
  btnArea: {
    textAlign: 'center',
    
    '& button': {
      
    }
  },
  walletLabel: {
    
  },
  tabContainer: {
   
  },
  rootTable: {
    width: '100%',
    marginTop: '24',
    overflowX: 'auto',
  },
  table: {
    minWidth: 400
  },
  tableLong: {
    minWidth: 900
  },
  sun: {},
  cloud: {},
  weathercard: {
   
    position: 'relative',
    overflow: 'hidden',
    height: 270,
    
   
    backgroundSize: 'cover',
    boxShadow: '0px 0px 25px 1px rgba(50, 50, 50, 0.1)',
    animation: 'appear 500ms ease-out forwards',
    '& h1': {
      position: 'absolute',
      fontWeight: '300',
      fontSize: 80,
    
      bottom: 0,
      left: 35,
      opacity: 0,
      transform: 'translateX(150px)',
      animation: 'title-appear 500ms ease-out 500ms forwards',
    },
    '& p': {
      position: 'absolute',
      fontWeight: 300,
      fontSize: 28,
      
      bottom: 0,
      left: 35,
      animation: 'title-appear 1s ease-out 500ms forwards',
    },
    '&$sun': {
      
      backgroundPosition: '0 -120px'
    },
    '&$cloud': {
      
      backgroundPosition: '0 -120px'
    }
  },
  amount: {
    '& input': {
      
    }
  }
});

export default styles;