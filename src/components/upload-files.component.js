import React, { Component } from "react";
import UploadService from "../services/upload-files.service";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Document can not be uploaded, contact admin for more details.",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
    } = this.state;

    return (
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        <div className="card">
          <div className="card-header">List of Documents</div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, border: 1  }} aria-label="Document table">
              <TableHead>
                <TableRow>
                  <TableCell>Document </TableCell>
                  <TableCell >User&nbsp;</TableCell>
                  <TableCell >Comment&nbsp;</TableCell>
                  <TableCell >Date&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fileInfos.map((file) => (
                  <TableRow
                    key={file.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="file">
                    <a href={file.url}>{file.name}</a>
                    </TableCell>
                    <TableCell >{file.user}</TableCell>
                    <TableCell >{file.comment}</TableCell>
                    <TableCell >{file.uploadDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
