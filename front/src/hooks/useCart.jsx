function useCart(id) {

  const addToCart = () => {
    let productId =`${id}`;
    let oldArr = localStorage.getItem("cart");
    if(oldArr){
      let toArr = oldArr.split(",");
      if(toArr.includes(productId)){
        // delete from arr
        let newArr = toArr.filter(item => item !== productId);
        localStorage.setItem("cart", newArr);
      } else {
        localStorage.setItem("cart", [oldArr, productId]);
      }
    }else {
      localStorage.setItem("cart", [ productId]);
    }
  }
  return {addToCart};
}
export default useCart;