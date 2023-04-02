
import React, { useState } from "react";
import { v4 } from "uuid";
import { number } from "yup";
import { AppSetting, MetaData, Paging } from "../../types/type";
import { paginationRange } from "../../utils/functions";
import { Translation } from "../translation";

const appSetting: AppSetting = require('../../appSetting.json');

type Props = {
    totalRows: number,
    pagingData: Paging,
    pageChangeEvent: (metaData: Paging) => void,
}
const Pagination: React.FC<Props> = ({ totalRows, pagingData, pageChangeEvent }) => {

    let totalPages = Math.ceil(totalRows / appSetting.PageSize); 

    const nextPageHandle = () => {
        let p = pagingData.index + 1; 
        pageChangeEvent({ index: p, size: appSetting.PageSize });
    }
    const prevPageHandle = () => {
        let p = pagingData.index - 1; 
        pageChangeEvent({ index: p, size: appSetting.PageSize });
    }
    const moveToPageHandle: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        var p = parseInt((e.target as HTMLAnchorElement).target); 
        pagingData.index = p;
        pageChangeEvent({ index: p, size: appSetting.PageSize });

    }

    if (totalPages > 1) {
        return (
            <>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        <li className={"page-item " + (pagingData.index === 1 ? "disabled" : "")}>
                            <a className="page-link pl-2 pr-2 noselect" href="#" onClick={prevPageHandle} ><Translation tid="btnPrev" /></a>
                        </li>
                        {paginationRange(totalPages >= 5 ? 5 : totalPages, (pagingData.index - 4) < 1 ? 1 : (pagingData.index - 4)).map(p =>
                            <li key={v4().toString()} className={"page-item  " + (pagingData.index === p ? "active" : "")}><a className="page-link noselect" href="#" target={p.toString()} onClick={moveToPageHandle} >{p}</a></li>
                        )}
                        <li className={"page-item " + (pagingData.index === totalPages ? "disabled" : "")}>
                            <a className="page-link pl-2 pr-2 noselect" href="#" onClick={nextPageHandle}><Translation tid="btnNext" /></a>
                        </li>
                    </ul>
                </nav>
            </>);
    }
    else {
        return (<></>);
    }
}

export default Pagination;