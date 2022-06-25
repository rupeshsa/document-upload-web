import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UploadFiles from "./components/upload-files.component";

configure({ adapter: new Adapter() });

describe("Document upload test", () => {
  it("Document upload test component", () => {
    const wrapper = shallow(<UploadFiles />);
  });
})