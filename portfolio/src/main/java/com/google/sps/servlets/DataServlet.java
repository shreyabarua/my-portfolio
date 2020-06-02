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

package com.google.sps.servlets;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
    private ArrayList<String> messages;
    @Override
    public void init() {
        messages = new ArrayList<String>();
        messages.add("hello");
        messages.add("hi");
        messages.add("howdy");
    }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String json =  convertToJson(messages);
    //send the JSON as the response
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  private String convertToJson(ArrayList<String> arr) {
      int i;
      String json = "[";
      for (i = 0; i < arr.size()-1; i++) {
          json += "\""+ arr.get(i) + "\", ";
      }
      json +=  "\"" + arr.get(i) + "\"";
      json += "]";
      return json;
  }
}
