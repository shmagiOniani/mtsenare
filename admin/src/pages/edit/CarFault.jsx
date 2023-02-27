import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Collapse, Input, Checkbox, Form, notification, Space, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons"
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API";
import "./Edit.scss"

const { TextArea } = Input;
const { Panel } = Collapse;
const { Search } = Input;

function CarFault({  treeClone, tree, getCheckboxArr, handleFinish }) {
  const {trans} = useTranslation();
  const { id, tab } = useParams();


  const [activeCollapseIds, setActiveCollapseIds] = useState([])
  const [coloredCollapseIds, setColoredCollapseIds] = useState([])
  const [markableIds, setMarkableIds] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [prevSetCollObj, setPrevSetCollObj] = useState({})
  const [checkBoxArr, setCheckBoxArr] = useState([]);
  const [faultArr, setFaultArr] = useState([]);
  const [loading, setLoading] = useState(false)


  const openCollapses = (itemId) => {
    let openable = treeClone.find(obj => obj?.item?.id === itemId)
      let array = activeCollapseIds
      array.push(openable?.item?.id.toString())
      setActiveCollapseIds(array)
      if(openable?.item?.parentId ){
        openCollapses(openable?.item?.parentId)
      }else {
        array.push(openable?.item?.id)
      }
      
  }

  const onSearch = (value) => {
    // setLoading(true)
    if (value.length > 0) {
      let result = [];
      result = treeClone.filter(obj => {
        return obj?.item?.name.includes(value)
      })
      if(result.length === 0) {
        openNotificationWithIcon()
      }
      result?.map(obj => {
        let array = markableIds
        array.push(obj?.item?.id.toString())
        setMarkableIds(array)
        openCollapses(obj?.item?.parentId)
      })
      
      // getTree()
    }
    setLoading(false)
  }

  //  checkbox handlers ------------------------------------------------------->
  const colorCollapses = (object) => {
    let arr = coloredCollapseIds;
    if (object?.parentId === null) {
      arr.push(object?.id.toString())
      setColoredCollapseIds(arr)
    } else {
      arr.push(object.id.toString())
      setColoredCollapseIds(arr)
      const nextObj = treeClone.find((item) => item.item.id === object.parentId)
      colorCollapses(nextObj.item)
    }
  }

  const handleCheckboxRec = () => {
    if (checkBoxArr?.length > 0) {
      let result = treeClone.filter(obj => checkBoxArr?.includes(obj?.item?.id))
      result?.map((obj) => colorCollapses(obj?.item))
    }
  }

  const handleCheckbox = (id, obj) => {
    const filter = checkBoxArr?.filter((checkBoxItemId) => checkBoxItemId !== id);
    const filterFaultArr = faultArr?.filter((checkBoxItemName) => checkBoxItemName.name !== obj.name);
    // checkbox logic
    if (!checkBoxArr?.includes(id)) {
      setCheckBoxArr((prev) => [...prev, id]);
      setFaultArr((prev) => [...prev, obj]);

    } else {
      setCheckBoxArr(filter);
      setFaultArr(filterFaultArr);
      handleFinish(filter);
    }
    // search logic
    handleCheckboxRec()
  };

  const callback = (key, obj) => {
    setPrevSetCollObj(obj)

    if (!obj.parentId) {
      if (activeCollapseIds.includes(obj.id)) {
        setActiveCollapseIds([])
      } else {
        setActiveCollapseIds([obj.id])

      }
    } else {
      setPrevSetCollObj(obj)
      // თუ ქიების მასივი შეიცავს წინა ობიექტის მშობლის ქის 
      // აქტიური კიების მასივიდანნ ამოვაგდოთ წინა ობიექტის აიდი
      // და ჩავსვათ ახალი ობიექტის აიდი
      if (activeCollapseIds.includes(prevSetCollObj?.parentId) && obj.parentId === prevSetCollObj?.parentId) {
        if (activeCollapseIds.includes(obj.id)) {
          const newData = activeCollapseIds.filter(item => item !== obj.id)
          setActiveCollapseIds(newData)
        } else {
            // const newData = [...activeCollapseIds, obj.id]
            const instance = activeCollapseIds.filter(item => item !== prevSetCollObj.id)
            setActiveCollapseIds(instance)
            setActiveCollapseIds(prev => [...prev, obj.id])
          }
      } else {
        // თუ ქიების მასივი არ შეიცავს წინა ობიექტის მშობლის ქის
        // აქტიური კიების მასივს ჩავუმატოთ ობიექტის იდ

        let instance = activeCollapseIds.filter(item => item !== prevSetCollObj.id)
        instance = [...activeCollapseIds, obj.id]
        setActiveCollapseIds(instance)
        // 
        if(prevSetCollObj.parentId !== null){
          const prevObjGpar = treeClone.find(item => item.item.id === prevSetCollObj.parentId)
          if(prevObjGpar.item.parentId === obj.parentId) {
            const filterChild = activeCollapseIds.filter(item => item !== prevSetCollObj.id)
            const filterChildParent = filterChild.filter(item => item !== prevSetCollObj.parentId)
            setActiveCollapseIds([...filterChildParent, obj.id])
          }
        }
      }

    }

  };

  const createTree = function (leaf) {
    let a = <></>;
    if (!leaf) return a;

    if (Array.isArray(leaf.children)) {
      leaf.children.forEach(function (item) {
        a = (
          <>
            {a} {createTree(item)}
          </>
        );
      });
    }

    return (
      <div key={leaf?.item?.id} >
      {/* <div key={leaf.item.id} > */}

        {leaf?.item?.leaf ? (
          <div
            className={`leaf ${leaf?.item?.priority === 1
              ? "yellow"
              : leaf?.item?.priority === 2
                ? "red"
                : ""
              }`}
          >
            <div className="checkbox" onClick={()=> console.log("data",treeClone.find(i => i?.item.id === leaf?.item.parentId))}>
              <Checkbox
                checked={checkBoxArr?.includes(leaf?.item?.id)}
                onChange={() => {
                  handleCheckbox(leaf?.item?.id, leaf?.item)
                }}
              >
               {leaf?.item?.name} - <span >{`( ${treeClone.find(i => i?.item?.id === leaf?.item?.parentId)?.item?.name})`}</span>
                {/* {push((`${leaf.item.name} - (${treeClone.find(i => i.item.id === leaf.item.parentId).item.name})`), leaf.item.name)} */}
              
              </Checkbox>
            </div>
          </div>
        ) : (
          <Collapse
            activeKey={activeCollapseIds}
            onChange={(key) => callback(key, leaf?.item)}
            expandIconPosition={"right"}
          // key={leaf.item.id}
          >
            <Panel
              className={` ${coloredCollapseIds.includes(leaf?.item?.id.toString()) ? "marked-collapse" : ""}`}
              header={leaf?.item?.name}
              key={leaf?.item?.id}
            >
            {a}
            </Panel>
          </Collapse>
        )}
      </div>
    );
  };


  const handleVehicleApi = () => {
    API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${id}` } })
      .then((res) => {
        setCheckBoxArr(res.data.rejectedDetails.map(i => i.rejectedDetailId))
        
        const rejectedArr = res.data?.rejectedDetails?.map((item) => item.rejectedDetailId);
        const initNamesObjs = treeClone?.filter(item => rejectedArr?.includes(item?.item?.id));
        const initNames = initNamesObjs?.map(item => item.item);
        setFaultArr(initNames)
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      })
  };

  useEffect(() => {
    handleVehicleApi()
  }, []);


  useEffect(() => {
    getCheckboxArr(checkBoxArr);
    if (checkBoxArr?.length > 0) {
      handleFinish(checkBoxArr);
    }else {
      // handleFinish([]);
    }
    handleCheckboxRec()
  }, [checkBoxArr]);

  const openNotificationWithIcon = () => {
    notification['info']({
      message: trans('not_found'),
      placement: "bottomLeft",
      description: trans('no_error_found'),
    });
  };

  return (
    <>
    <div className="car-fault">
      {/* <div onClick={() => log()}>Click</div> */}
      {/* search input */}
      <div className="search-input" >
        <Search
          placeholder={trans("search")}
          allowClear
          enterButton={<SearchOutlined />}
          onSearch={(e) => onSearch(e.target.value)}
          onChange={(e) => {
            setActiveCollapseIds([])
            setMarkableIds([])
            setSearchValue(e.target.value)

            if(e.target.value.length> 3) { onSearch(e.target.value) }
          }}
        />
      </div>
      {/* tree collapse  */}
      {tree?.map((item, index) => {
        return createTree(item);
      })}
      <div className="comment">
        <Form.Item name="comment" >
          <TextArea showCount maxLength={100} placeholder={trans("comment")} />
        </Form.Item>
      </div>
      {/* car fault full list */}
      {faultArr.length > 0 ?
        <div className="car-fault-list ">
          <div className="car-fault-header">
            {trans('defects_found')}
          </div>
          <ul>
            {faultArr?.map((item, index) => {
              return <li key={index} className={` ${item.priority === 1
                ? "yellow"
                : item.priority === 2
                  ? "red"
                  : ""
                }`}>{item?.name}</li>;
            })}
          </ul>
        </div>
        : ""}
    </div>
    {loading &&
      <Space size="middle" className='loading'>
        <Spin size="large" />
      </Space>
    }
    </>
  );
}

export default CarFault;
