import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Box,
  TextField,
} from "@mui/material";

const Test = () => {
  const [data, setData] = useState<{
    message: string;
    base64Image: string;
    base64Image2: string;
    best_correlation: number;
    best_lag: number;
    cross_correlation: number[];
    pearson_correlation_coefficient: number;
    pearson_correlation_coefficient_pandas: number;
  } | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [maxLag, setMaxLag] = useState<number>(50);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFiles((prevFiles) => [...prevFiles, fileList[0]]);
    }
  };

  const handleMaxLagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setMaxLag(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    formData.append("max_lag", maxLag.toString());

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Next.js with Python Backend
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="file1">File 1</InputLabel>
          <Input type="file" id="file1" onChange={handleFileChange} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="file2">File 2</InputLabel>
          <Input type="file" id="file2" onChange={handleFileChange} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="max-lag"
            label="Max Lag"
            type="number"
            defaultValue={50}
            InputProps={{ inputProps: { min: 1 } }}
            onChange={handleMaxLagChange}
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Upload
        </Button>
      </form>
      {data && (
        <>
          <Typography variant="h5" component="h2" gutterBottom>
            {data.message}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            best_correlation: {data.best_correlation}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            best_lag: {data.best_lag}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            cross_correlation: {data.cross_correlation[0]}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            pearson_correlation_coefficient:{" "}
            {data.pearson_correlation_coefficient}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            pearson_correlation_coefficient_pandas:{" "}
            {data.pearson_correlation_coefficient_pandas}
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/png;base64,${data.base64Image}`}
              alt="Lag Plot"
            />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/png;base64,${data.base64Image2}`}
              alt="Lag Plot"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Test;
