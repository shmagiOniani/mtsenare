import {useHistory} from "react-router-dom";
import useTranslation from '../components/translation/useTranslation';
import  {DoubleLeftOutlined} from "@ant-design/icons"
import {Row, Col, Button} from "antd"

export default function NotFound() {
    const {trans} = useTranslation();
    let history = useHistory();

    return (
        <div className="content-wrapper">
            <Row>
                <Col md={12}>
                    <h1 className="text-secondary">{trans('page_not_found')}</h1>
                    <Button type="ghost" icon={<DoubleLeftOutlined />} size={"large"} onClick={() => history.goBack()}>
                        {trans('go_back')}
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
