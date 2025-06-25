package com.pro.path_finder.request;

import lombok.Getter;

@Getter
public class SearchRequestBase {

    private int pageSize = 200;
    private int pageNumber = 0;

    public void setPageSize(int pageSize) {

        if (pageSize <= 0 || pageSize > 2000) {
            return;
        }
        this.pageSize = pageSize;
    }

    public void setPageNumber(int pageNumber) {

        if (pageNumber < 0) {
            return;
        }
        this.pageNumber = pageNumber;
    }
}
