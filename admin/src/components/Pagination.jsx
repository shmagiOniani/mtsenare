import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons";

const PaginationComponent = ({links, pageMeta, passPage}) => {

    return (
        <nav className="d-flex flex-row align-items-center justify-content-center mb-3 ">
            <ul className="pagination mr-2 mb-0">
                <li onClick={() => passPage(1 !== pageMeta.current_page ? pageMeta.current_page - 1 : pageMeta.current_page)}
                    className={`page-item mr-3 ${pageMeta.current_page === 1 ? "disabled" : ""}`}
                    aria-disabled={`${pageMeta.current_page === 1 ? "true" : "false"}`}>
					<span className="page-link" rel="prev" aria-label="previous">
						<FontAwesomeIcon icon={faChevronLeft}/>
					</span>
                </li>
                {links?.map((link, key) => (
                    <li onClick={() => passPage(link.label)}
                        key={key}
                        className={`page-item ${link.active === true ? "active" : ""}`}
                        aria-current="page">
                        <span className="page-link">{link.label}</span>
                    </li>
                ))}
                <li onClick={() => passPage(pageMeta.last_page !== pageMeta.current_page ? pageMeta.current_page + 1 : pageMeta.current_page)}
                    className={`page-item ml-3 ${pageMeta.last_page === pageMeta.current_page ? "disabled" : ""}`}
                    aria-disabled={`${pageMeta.last_page === pageMeta.current_page ? "true" : "false"}`}>
					<span className="page-link" rel="next" aria-label="next">
						<FontAwesomeIcon icon={faChevronRight}/>
					</span>
                </li>
            </ul>
        </nav>
    );
};
export default PaginationComponent;
