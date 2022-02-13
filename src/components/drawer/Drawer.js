import { useState ,useEffect} from "react";
import { getlocal } from "./../../utils/index";
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from "@material-ui/core";


const DrawerItem = (props) => {
  const { item ,setItem} = props;
  const { coin } = item;
  const { market_data } = coin;
  const profit = market_data.price_change_percentage_24h > 0;
  const handleRemove = () => {
       const data=getlocal("favourites");
        const newData=data.filter(item=>item.id!==coin.id)
        localStorage.setItem("favourites",JSON.stringify(newData));
        setItem(newData);
  }
  return (
  
    <>
      <div className="sidebar_item">
        <img src={coin.image.small} className="coin_img"></img>
        <h4 style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red" }}>
          { market_data.price_change_percentage_24h.toFixed(2)}%
        </h4>
        <h7>{coin.symbol}</h7>
    <IconButton onClick={()=>handleRemove(item.id)}>
      <DeleteIcon/>
    </IconButton>
       </div>
    </>
  );
};
const Drawer = (props) => {
  const { open, setOpen } = props;
  const [item, setItem] = useState(getlocal("favourites"));

 useEffect(()=>{
  setItem(getlocal("favourites"));

},[open])

  let classes;
  console.log(item);
  if (open) {
    classes = "sidebar_open";
  } else {
    classes = "";
  }

  return (
    <>
      <div className={`sidebar_container  ${classes}`}>
        <div className="sidebar ">
          <h2>
            <span
            className="sidebar_header"
            >Favourites</span>
          </h2>
          {item.map((item) => (
            <DrawerItem setItem={setItem} item={item} />
          ))}
        </div>
        <div
          className="clear_sidebar "
          onClick={() => {
            setOpen(!props.open);
          }}
        ></div>
      </div>
    </>
  );
};

export default Drawer;
