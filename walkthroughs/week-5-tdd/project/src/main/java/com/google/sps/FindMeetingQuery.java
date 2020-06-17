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
import java.util.Collections;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    ArrayList<TimeRange> availableTimes = new ArrayList<TimeRange>();
    if (request.getDuration() > TimeRange.WHOLE_DAY.duration()) {
      // not possible for duration to exceed whole day
      return availableTimes; 
    }
    ArrayList<TimeRange> blockedTimes = new ArrayList<TimeRange>();
    Set<String> r_attendees = new HashSet<String>(request.getAttendees());      
    for (Event e : events) { // check each event of the day for blocked times
      Set<String> e_attendees = new HashSet<String>(e.getAttendees());
      Set<String> intersection = new HashSet<String>(r_attendees);
      intersection.retainAll(e_attendees);
      if (intersection.isEmpty()) { 
        continue; // none of our attendees will be at this event
      }
      else {
        // at least one of our attendees will be at this event
        blockedTimes.add(e.getWhen()); 
      }
    }
    Collections.sort(blockedTimes, TimeRange.ORDER_BY_START);
    
    // remove any nested events where the shorter event overrides the longer event
    for (int count = 0; count < blockedTimes.size()-1; count++) {  
      if ((blockedTimes.get(count)).contains(blockedTimes.get(count+1))) {
        blockedTimes.remove(count+1);
        count--;
      }

    }

    // go through blocked times and find open times surrounding it
    int start = TimeRange.START_OF_DAY;
    for (TimeRange t : blockedTimes) {
      int end = t.start(); 
      TimeRange good =  TimeRange.fromStartEnd(start, end, false);
      if (good.duration() >= request.getDuration()) availableTimes.add(good);
      start = end + t.duration(); //must resume after the event ends
    }

    // for the rest of the day:
    TimeRange eod =  TimeRange.fromStartEnd(start, TimeRange.END_OF_DAY, true);
    if (eod.duration() >= request.getDuration()) availableTimes.add(eod);
    return availableTimes;

  }
}
