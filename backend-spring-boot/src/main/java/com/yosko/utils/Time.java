package com.yosko.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Time {
    private static final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    private static final LocalDateTime now = LocalDateTime.now();

    public static String getCurrentTime() {
        return dtf.format(now);
    }
}
