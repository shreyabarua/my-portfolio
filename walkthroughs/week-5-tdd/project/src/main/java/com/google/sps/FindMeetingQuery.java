// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection; 
import java.util.Set;
import java.util.HashSet;
import java.util.*;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    ArrayList<TimeRange> available_times = new ArrayList<TimeRange>();
    if (request.getDuration() > TimeRange.WHOLE_DAY.duration()) { // not possible for duration to exceed whole day
        return available_times;
    }
    ArrayList<TimeRange> blocked_times = new ArrayList<TimeRange>();
    Set<String> r_attendees = new HashSet<String>(request.getAttendees());      
    for (Event e : events) { // check each event of the day for blocked times
        Set<String> e_attendees = new HashSet<String>(e.getAttendees());
        Set<String> intersection = new HashSet<String>(r_attendees);
        intersection.retainAll(e_attendees);
        if (intersection.isEmpty()) { 
            continue; // none of our attendees will be at this event
        }
        else {
            blocked_times.add(e.getWhen()); // at least one of our attendees will be at this event so we cannot do this time
        }
    }
    Collections.sort(blocked_times, TimeRange.ORDER_BY_START);
    
    // remove any nested events
    for (int count = 0; count < blocked_times.size()-1; count++) {
        if ((blocked_times.get(count)).contains(blocked_times.get(count+1))) {
            blocked_times.remove(count+1);
            count--;
        }
    }
    // go through blocked times and find open times surrounding it
    int start = 0;
    for (TimeRange t : blocked_times) {
        int end = t.start(); 
        TimeRange good =  TimeRange.fromStartEnd(start, end,false);
        if (good.duration() >= request.getDuration()) available_times.add(good); //only add if there's enough time for the meeting
        start = end + t.duration(); //must resume after the event ends

    }
    // for the rest of the day:
    TimeRange eod =  TimeRange.fromStartEnd(start, 1440,false);
    if (eod.duration() >= request.getDuration()) available_times.add(eod);
    return available_times;

  }
}
