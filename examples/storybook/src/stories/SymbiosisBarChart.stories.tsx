import type { Meta, StoryObj } from "@storybook/react";
import { SymbiosisBarChart, type ChartConfig, calculateCountForDataOnDates } from "@synopsisapp/symbiosis-ui";

const rawData = [
  {
    id: "2a7611e2-5be6-4d85-80f8-0838f44d1ff7",
    type: "bananas",
    createDate: "2024-08-11",
  },
  {
    id: "21f12c42-3fb4-4b55-b05e-8559e06544b2",
    type: "bananas",
    createDate: "2024-08-11",
  },
  {
    id: "aed5c1d6-50eb-4b31-a231-0d0de63e8f8d",
    type: "bananas",
    createDate: "2024-08-11",
  },
  {
    id: "73eb377a-fd4d-4561-adbb-95810d268896",
    type: "apples",
    createDate: "2024-08-11",
  },
  {
    id: "28e51a05-27ff-4d72-9059-83fbad8f8ed6",
    type: "apples",
    createDate: "2024-08-11",
  },
  {
    id: "346536f3-24df-4a05-9506-7cf54b7358a2",
    type: "apples",
    createDate: "2024-08-11",
  },
  {
    id: "b2f14861-b99f-43a2-854b-5d15530b73a5",
    type: "apples",
    createDate: "2024-08-11",
  },
  {
    id: "206069bb-d7e4-445b-bc2b-edf33385bc42",
    type: "carrots",
    createDate: "2024-08-11",
  },
  {
    id: "52f3630f-6e44-419f-ae77-a80dc654514e",
    type: "carrots",
    createDate: "2024-08-11",
  },
  {
    id: "2352b381-7710-48ff-9b9d-990691954700",
    type: "bananas",
    createDate: "2024-08-12",
  },
  {
    id: "3c20fb47-8a48-4481-b6aa-2cb9ea125dc9",
    type: "bananas",
    createDate: "2024-08-12",
  },
  {
    id: "d96fd93c-723a-4f0c-a5da-524dc9c93a91",
    type: "bananas",
    createDate: "2024-08-12",
  },
  {
    id: "85a2c829-45ec-4dd9-a3af-7830feeb102d",
    type: "bananas",
    createDate: "2024-08-12",
  },
  {
    id: "60dc1f8c-7c96-4fce-915d-3f918df8e72a",
    type: "apples",
    createDate: "2024-08-12",
  },
  {
    id: "a977a2fa-21dd-4e6b-8b3d-7105b0618097",
    type: "apples",
    createDate: "2024-08-12",
  },
  {
    id: "c1143f36-75ad-456b-bb29-7aa994f7a8f4",
    type: "apples",
    createDate: "2024-08-12",
  },
  {
    id: "5aa7afff-7ab4-4a3d-8d6a-3e245f00e562",
    type: "apples",
    createDate: "2024-08-12",
  },
  {
    id: "8c273dcd-fb6d-4e39-9793-1112ecae66ad",
    type: "carrots",
    createDate: "2024-08-12",
  },
  {
    id: "26ee5e58-7b95-4105-8b00-6b762ce60455",
    type: "carrots",
    createDate: "2024-08-12",
  },
  {
    id: "71b6903a-a70b-42e4-8cad-cc2c7be5bd38",
    type: "carrots",
    createDate: "2024-08-12",
  },
  {
    id: "414500c7-5bdf-4b56-bc93-cb5c995e2ecb",
    type: "bananas",
    createDate: "2024-08-13",
  },
  {
    id: "5c06d7ae-7dde-4388-a959-792cea0fb648",
    type: "bananas",
    createDate: "2024-08-13",
  },
  {
    id: "e99c5289-011a-4924-afa2-b260f2ed2370",
    type: "bananas",
    createDate: "2024-08-13",
  },
  {
    id: "518ce16a-8efd-4bc5-aba0-8f072920b5af",
    type: "bananas",
    createDate: "2024-08-13",
  },
  {
    id: "d275319f-17b7-448b-93b8-51ed54165d8f",
    type: "apples",
    createDate: "2024-08-13",
  },
  {
    id: "f601b191-4d7a-474b-98f7-7c5ca34acded",
    type: "apples",
    createDate: "2024-08-13",
  },
  {
    id: "06538440-e524-41a5-8850-4582f798dc09",
    type: "apples",
    createDate: "2024-08-13",
  },
  {
    id: "5139384e-f7bd-46cd-b6a9-9c32544e8892",
    type: "apples",
    createDate: "2024-08-13",
  },
  {
    id: "46253f05-d916-4ea0-8b5e-b187098f94bd",
    type: "apples",
    createDate: "2024-08-13",
  },
  {
    id: "c7928465-51d1-4723-83f6-37294ba817be",
    type: "carrots",
    createDate: "2024-08-13",
  },
  {
    id: "75e63ec2-cddc-4934-85d8-4f6df47cb07b",
    type: "carrots",
    createDate: "2024-08-13",
  },
  {
    id: "486f7523-e6d2-436e-805a-be82d289ebf4",
    type: "carrots",
    createDate: "2024-08-13",
  },
  {
    id: "11d58c00-faaa-45be-8117-1eb2a908a379",
    type: "bananas",
    createDate: "2024-08-14",
  },
  {
    id: "f4ce9d29-855c-4045-b191-1b5f57e4c55b",
    type: "bananas",
    createDate: "2024-08-14",
  },
  {
    id: "f1948365-5402-4a48-8cab-75e25bc28ae6",
    type: "bananas",
    createDate: "2024-08-14",
  },
  {
    id: "4ff77557-3e6a-499d-9531-26dd835d567b",
    type: "bananas",
    createDate: "2024-08-14",
  },
  {
    id: "7fdc2ac4-2b70-4e57-95cc-755759d20470",
    type: "apples",
    createDate: "2024-08-14",
  },
  {
    id: "c7ec5778-125b-405b-a2a7-77e4008ad1aa",
    type: "apples",
    createDate: "2024-08-14",
  },
  {
    id: "dde12d6e-825a-45d3-81ed-a0cb57918948",
    type: "apples",
    createDate: "2024-08-14",
  },
  {
    id: "3afe699c-6cb0-4620-8bda-8a7fa65edbcb",
    type: "apples",
    createDate: "2024-08-14",
  },
  {
    id: "51c88203-3da6-4edf-8e25-ed168d61eec8",
    type: "apples",
    createDate: "2024-08-14",
  },
  {
    id: "67e87a32-226d-4924-a74a-3aac7ddcd92d",
    type: "carrots",
    createDate: "2024-08-14",
  },
  {
    id: "5d8bcca2-cf97-41e1-97ce-eaead6459a3c",
    type: "carrots",
    createDate: "2024-08-14",
  },
  {
    id: "9d59ca45-c67f-4f6f-bb8c-0bfe6067faac",
    type: "carrots",
    createDate: "2024-08-14",
  },
  {
    id: "7ba462e0-6b5c-422e-bba6-223343895db1",
    type: "carrots",
    createDate: "2024-08-14",
  },
  {
    id: "ff86adbc-b672-41ce-a63b-a59b56b63cd3",
    type: "bananas",
    createDate: "2024-08-15",
  },
  {
    id: "b207d989-d56f-4513-89ac-c5b2c81ffb52",
    type: "bananas",
    createDate: "2024-08-15",
  },
  {
    id: "9d28c171-a290-4ed7-b73c-14ab7dd48561",
    type: "bananas",
    createDate: "2024-08-15",
  },
  {
    id: "c1fc0e2b-6b8d-40ce-bc31-55dfb806b0ce",
    type: "bananas",
    createDate: "2024-08-15",
  },
  {
    id: "b60ed879-aa1c-4901-8b21-508ba1ebc121",
    type: "bananas",
    createDate: "2024-08-15",
  },
  {
    id: "cb898167-2e3b-4376-b947-4328ae71d25d",
    type: "apples",
    createDate: "2024-08-15",
  },
  {
    id: "693a05d6-6574-4b44-b637-9a4f61c2fecf",
    type: "apples",
    createDate: "2024-08-15",
  },
  {
    id: "6f142021-3a0c-4114-a01b-8e2c5274f1ae",
    type: "apples",
    createDate: "2024-08-15",
  },
  {
    id: "f830f193-4ba1-4120-aa26-6312b59c28e9",
    type: "apples",
    createDate: "2024-08-15",
  },
  {
    id: "e91f2e21-417b-4b63-88e6-d7f506f4212e",
    type: "apples",
    createDate: "2024-08-15",
  },
  {
    id: "bfd705a9-71bf-4296-85d6-e7b23c5424c8",
    type: "carrots",
    createDate: "2024-08-15",
  },
  {
    id: "115fe02e-99da-47a1-a672-d470547383c9",
    type: "carrots",
    createDate: "2024-08-15",
  },
  {
    id: "c5d67b99-b831-4023-bf79-b7bbf6532f3f",
    type: "carrots",
    createDate: "2024-08-15",
  },
  {
    id: "b2534ba3-a842-43af-9470-13c6572b7342",
    type: "carrots",
    createDate: "2024-08-15",
  },
  {
    id: "c3c28c09-d138-4d5a-950d-7a66272606f2",
    type: "bananas",
    createDate: "2024-08-16",
  },
  {
    id: "1727d2df-1097-4472-90f8-3ad7ef261268",
    type: "bananas",
    createDate: "2024-08-16",
  },
  {
    id: "1538a341-7567-426a-8885-fb53e362844d",
    type: "bananas",
    createDate: "2024-08-16",
  },
  {
    id: "dcc3298d-9bc4-4587-812d-1a31032166a0",
    type: "bananas",
    createDate: "2024-08-16",
  },
  {
    id: "f8180321-9b3a-408a-87f3-b2494142d651",
    type: "bananas",
    createDate: "2024-08-16",
  },
  {
    id: "f4dca74c-ef43-40a1-a517-fe3e0747faf1",
    type: "apples",
    createDate: "2024-08-16",
  },
  {
    id: "c21ab61b-0a2c-4750-b400-5d7757384e48",
    type: "apples",
    createDate: "2024-08-16",
  },
  {
    id: "1f501ce7-f752-4e00-b0b5-c1a89c33efb4",
    type: "apples",
    createDate: "2024-08-16",
  },
  {
    id: "1f3d3d8d-6079-4eea-b06b-ef10b2e6e338",
    type: "apples",
    createDate: "2024-08-16",
  },
  {
    id: "416733d7-2976-4114-8c2f-fefc7d0f2bb5",
    type: "apples",
    createDate: "2024-08-16",
  },
  {
    id: "713e3b2b-e745-480a-982c-552aefecd334",
    type: "carrots",
    createDate: "2024-08-16",
  },
  {
    id: "a612c963-aa65-4a03-8f42-62b2a28bbf10",
    type: "carrots",
    createDate: "2024-08-16",
  },
  {
    id: "6b8883cb-0d37-4d78-ab9f-576d267f97fc",
    type: "carrots",
    createDate: "2024-08-16",
  },
  {
    id: "9c1cf2be-4046-418a-9e02-692331686116",
    type: "carrots",
    createDate: "2024-08-16",
  },
  {
    id: "99ed50cb-ba28-4db6-a430-d83c9bc96d23",
    type: "bananas",
    createDate: "2024-08-17",
  },
  {
    id: "a532b4a2-9bde-4c13-809c-099087da10ad",
    type: "bananas",
    createDate: "2024-08-17",
  },
  {
    id: "39f4a305-0d2e-4fa7-9cb9-1dc4d11cc196",
    type: "bananas",
    createDate: "2024-08-17",
  },
  {
    id: "da120a08-46e0-478c-bfca-95e6c0299504",
    type: "bananas",
    createDate: "2024-08-17",
  },
  {
    id: "9e268d94-ffc1-4f7d-ba26-48d28604db52",
    type: "apples",
    createDate: "2024-08-17",
  },
  {
    id: "d3dd0563-e728-4717-a30f-38a70910e54c",
    type: "apples",
    createDate: "2024-08-17",
  },
  {
    id: "873375e6-e5c4-4532-8cb8-cc0f1ba28722",
    type: "apples",
    createDate: "2024-08-17",
  },
  {
    id: "fd93d49d-263b-41be-ac10-68e4af8bff08",
    type: "apples",
    createDate: "2024-08-17",
  },
  {
    id: "469cf3a4-0f21-4959-b276-baa86444f878",
    type: "carrots",
    createDate: "2024-08-17",
  },
  {
    id: "b6a3ab8f-8cf6-498f-ad35-46dc902f4b4c",
    type: "carrots",
    createDate: "2024-08-17",
  },
  {
    id: "f5f26af4-8168-4416-ba02-05344e8e8756",
    type: "carrots",
    createDate: "2024-08-17",
  },
  {
    id: "6500b6a4-8da3-4a83-b376-e106c839dea1",
    type: "carrots",
    createDate: "2024-08-17",
  },
  {
    id: "c77c70a0-6cc4-49a4-9156-9d46e683e2a1",
    type: "bananas",
    createDate: "2024-08-18",
  },
  {
    id: "3c452ad3-5b33-4eee-8ae4-7a75fb431d4d",
    type: "bananas",
    createDate: "2024-08-18",
  },
  {
    id: "948dd482-6ae5-4a46-82bf-2d156148b32a",
    type: "bananas",
    createDate: "2024-08-18",
  },
  {
    id: "082ec9a0-1587-4bca-9947-957bb0121f01",
    type: "bananas",
    createDate: "2024-08-18",
  },
  {
    id: "ef10a572-93e7-4012-8b1e-ad21fe092f00",
    type: "apples",
    createDate: "2024-08-18",
  },
  {
    id: "180e178c-825d-4723-a983-32c3815dfe68",
    type: "apples",
    createDate: "2024-08-18",
  },
  {
    id: "f1b1b9d7-f1a1-4a8c-80ee-e808e6cc0aa7",
    type: "carrots",
    createDate: "2024-08-18",
  },
  {
    id: "391c0657-9708-41ea-befb-4169c90b6c7a",
    type: "bananas",
    createDate: "2024-08-19",
  },
  {
    id: "113eecfe-3e7e-4d98-b13a-de3a1871457a",
    type: "bananas",
    createDate: "2024-08-19",
  },
  {
    id: "b3036289-b099-46e1-b20b-3c646a23e32f",
    type: "bananas",
    createDate: "2024-08-19",
  },
  {
    id: "88d49def-8ceb-49ee-af9e-9261e4cc1eb4",
    type: "apples",
    createDate: "2024-08-19",
  },
  {
    id: "6d1f3a96-5b96-44f3-a09e-e4af827fc453",
    type: "apples",
    createDate: "2024-08-19",
  },
  {
    id: "505681df-9766-4a45-ba9a-eb28e436110a",
    type: "apples",
    createDate: "2024-08-19",
  },
  {
    id: "a390efcd-6f3a-42ad-ba96-bc7fca6898b6",
    type: "carrots",
    createDate: "2024-08-19",
  },
  {
    id: "be3139c6-cd09-44f9-b240-ef4e7883d17a",
    type: "carrots",
    createDate: "2024-08-19",
  },
  {
    id: "b0ca53f7-bd47-4aec-8164-59d1086849a3",
    type: "carrots",
    createDate: "2024-08-19",
  },
  {
    id: "59e26aa6-f302-4db3-98be-1e6018386657",
    type: "bananas",
    createDate: "2024-08-20",
  },
  {
    id: "ae692e70-c04c-4290-9837-8d3808c32b22",
    type: "bananas",
    createDate: "2024-08-20",
  },
  {
    id: "b7e76c9f-30c4-48ee-8ec7-1bf4a58b3127",
    type: "bananas",
    createDate: "2024-08-20",
  },
  {
    id: "fd38b66b-ddf0-4595-ab2a-220e0e541a34",
    type: "apples",
    createDate: "2024-08-20",
  },
  {
    id: "29ef5f93-cc30-44bd-88ca-28fcad773320",
    type: "apples",
    createDate: "2024-08-20",
  },
  {
    id: "24efe7d9-d7ba-463d-84c0-83071ed634b9",
    type: "carrots",
    createDate: "2024-08-20",
  },
  {
    id: "c9594564-1514-4b5c-a181-c382e62d23f7",
    type: "carrots",
    createDate: "2024-08-20",
  },
  {
    id: "952b70f4-ad59-4d7e-9200-59b473502498",
    type: "bananas",
    createDate: "2024-08-21",
  },
  {
    id: "3b2ffe19-52e9-47ac-9d7d-77bcd7b1f619",
    type: "bananas",
    createDate: "2024-08-21",
  },
  {
    id: "3223eb2c-5896-4d7b-b88a-5d5abdfeb4a8",
    type: "apples",
    createDate: "2024-08-21",
  },
  {
    id: "0a7103d3-b8f3-43dc-9ce1-ada43982240c",
    type: "apples",
    createDate: "2024-08-21",
  },
  {
    id: "32d8a445-fe24-40c7-93f3-617f58b183a5",
    type: "carrots",
    createDate: "2024-08-21",
  },
  {
    id: "c44f92cb-17c6-4328-ad2b-a13c6ac0a9bd",
    type: "bananas",
    createDate: "2024-08-22",
  },
  {
    id: "0a1dc623-b8ee-4cb8-918c-efa688c537e8",
    type: "apples",
    createDate: "2024-08-22",
  },
  {
    id: "7ede7674-9924-4def-bcf1-7af988b38a32",
    type: "carrots",
    createDate: "2024-08-22",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853a1",
    type: "bananas",
    createDate: "2024-08-23",
  },
   {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853a3",
    type: "bananas",
    createDate: "2024-08-24",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853a2",
    type: "apples",
    createDate: "2024-08-25",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853b4",
    type: "carrots",
    createDate: "2024-08-25",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853b5",
    type: "apples",
    createDate: "2024-08-26",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853b6",
    type: "carrots",
    createDate: "2024-08-26",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853c6",
    type: "bananas",
    createDate: "2024-08-26",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853c7",
    type: "bananas",
    createDate: "2024-08-26",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853c8",
    type: "bananas",
    createDate: "2024-08-26",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853b7",
    type: "carrots",
    createDate: "2024-08-27",
  },
  {
    id: "5a7ecfbc-31ed-4e65-8413-562e2eb42f64",
    type: "bananas",
    createDate: "2024-08-28",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853b8",
    type: "bananas",
    createDate: "2024-08-28",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853b9",
    type: "apples",
    createDate: "2024-08-28",
  },
  {
    id: "d39eb986-9655-4e9f-8a7f-c92231f853c9",
    type: "carrots",
    createDate: "2024-08-28",
  },
  {
    id: "3ac9180b-5ae8-4748-8967-db97c516f6a5",
    type: "bananas",
    createDate: "2024-08-29",
  },
  {
    id: "c85cdfd8-538b-491d-8caa-cd4add72769b",
    type: "apples",
    createDate: "2024-08-29",
  },
  {
    id: "682f2762-8a5f-48a4-9a6f-b8496e5e98a0",
    type: "carrots",
    createDate: "2024-08-29",
  },
  {
    id: "4975a359-fcba-4de4-ab05-ed2aa92f6f2f",
    type: "bananas",
    createDate: "2024-08-30",
  },
  {
    id: "cab3e33e-777a-48c1-9567-a766e2286730",
    type: "bananas",
    createDate: "2024-08-30",
  },
  {
    id: "142eb36a-245a-42ff-a737-9651368bdd71",
    type: "apples",
    createDate: "2024-08-30",
  },
  {
    id: "f227419b-16e1-4fb4-9ae2-94b034c30c8e",
    type: "carrots",
    createDate: "2024-08-30",
  },
  {
    id: "7035d2f7-68f9-4bed-9368-11954c9db26a",
    type: "bananas",
    createDate: "2024-08-31",
  },
  {
    id: "6fe1f28d-ec59-480b-b854-2e52617d1cbb",
    type: "bananas",
    createDate: "2024-08-31",
  },
  {
    id: "21bb315b-edf6-41ee-8d25-57d5367def63",
    type: "apples",
    createDate: "2024-08-31",
  },
  {
    id: "9c7ee26d-2da2-42b7-8622-444fbb45010a",
    type: "apples",
    createDate: "2024-08-31",
  },
  {
    id: "8833b4c8-1f6e-4606-8d91-a6064f5f02e9",
    type: "carrots",
    createDate: "2024-08-31",
  },
  {
    id: "83ad65fc-1ea5-4ef0-9bdd-25c0edb54c01",
    type: "carrots",
    createDate: "2024-08-31",
  },
  {
    id: "4da67eb1-5d41-4af7-86f2-e810c8e96fca",
    type: "bananas",
    createDate: "2024-09-01",
  },
  {
    id: "cad2916d-0585-4441-bf66-34dabd8debff",
    type: "bananas",
    createDate: "2024-09-01",
  },
  {
    id: "d182d936-7da9-4d02-85b1-03cd2fecd5f7",
    type: "bananas",
    createDate: "2024-09-01",
  },
  {
    id: "e450734c-81f7-44d8-a2db-56dd001246cd",
    type: "apples",
    createDate: "2024-09-01",
  },
  {
    id: "ee008e71-300f-4678-b6de-b82a5d6e3627",
    type: "apples",
    createDate: "2024-09-01",
  },
  {
    id: "4d65a620-aa94-41cc-8b40-581b09157a19",
    type: "carrots",
    createDate: "2024-09-01",
  },
  {
    id: "7d372eda-12a1-4a03-800e-04f52851b33f",
    type: "carrots",
    createDate: "2024-09-01",
  },
  {
    id: "5b065ee1-1ba2-4a52-abd7-5a512fa2dca1",
    type: "carrots",
    createDate: "2024-09-01",
  },
  {
    id: "894aa41c-986d-4f5d-9cc3-9cb475e4d2a3",
    type: "bananas",
    createDate: "2024-09-02",
  },
  {
    id: "80254c73-e4aa-42ee-84f5-677a546d6822",
    type: "bananas",
    createDate: "2024-09-02",
  },
  {
    id: "c40f4f10-5153-4c6c-8e0d-80e131ddea22",
    type: "bananas",
    createDate: "2024-09-02",
  },
  {
    id: "702aca72-0fb2-438d-a7e3-5e0a4a75d365",
    type: "apples",
    createDate: "2024-09-02",
  },
  {
    id: "8b25e2e3-0b87-47cf-abc2-0b8ea06b67dd",
    type: "apples",
    createDate: "2024-09-02",
  },
  {
    id: "20a6315d-4f02-4dd4-b646-95b4787e6652",
    type: "apples",
    createDate: "2024-09-02",
  },
  {
    id: "9b808faa-8a1e-44aa-9652-26c452d6bd3a",
    type: "carrots",
    createDate: "2024-09-02",
  },
  {
    id: "170d9b1f-4ebe-40af-9acc-0bba9cb3274e",
    type: "carrots",
    createDate: "2024-09-02",
  },
  {
    id: "c3b0db3a-af47-4a51-b044-c907da856345",
    type: "carrots",
    createDate: "2024-09-02",
  },
  {
    id: "16742fca-d21a-4a10-9c5e-568600d7c6e4",
    type: "bananas",
    createDate: "2024-09-03",
  },
  {
    id: "882125f5-b80e-40b3-9444-f2a34b7df8ca",
    type: "bananas",
    createDate: "2024-09-03",
  },
  {
    id: "fd5d053f-c571-4d73-9bbb-255a804d4651",
    type: "bananas",
    createDate: "2024-09-03",
  },
  {
    id: "14debd4b-6664-41db-b100-a6d43c8f4545",
    type: "bananas",
    createDate: "2024-09-03",
  },
  {
    id: "7ce7fb79-e60a-49de-8db2-62e1fafebb5d",
    type: "apples",
    createDate: "2024-09-03",
  },
  {
    id: "a7616793-0ebd-4c00-a11e-54d5032ab2ff",
    type: "apples",
    createDate: "2024-09-03",
  },
  {
    id: "084d3679-b664-4d1b-a3ed-be44fa658184",
    type: "apples",
    createDate: "2024-09-03",
  },
  {
    id: "74359a64-1767-4cf8-bbbe-bd62816b22ea",
    type: "carrots",
    createDate: "2024-09-03",
  },
  {
    id: "09ce7ba1-aef5-483f-a67d-74290d0cd9e7",
    type: "carrots",
    createDate: "2024-09-03",
  },
  {
    id: "5b2c1b37-c190-4f05-80b2-3e9148ea18d9",
    type: "carrots",
    createDate: "2024-09-03",
  },
  {
    id: "90cc8415-4188-4c22-8736-6365c6c8e2c5",
    type: "bananas",
    createDate: "2024-09-04",
  },
  {
    id: "6cfd7371-ba8e-4ec8-bf22-4a2c6f4e249f",
    type: "bananas",
    createDate: "2024-09-04",
  },
  {
    id: "dbd9f9a2-db43-427d-8af2-8e4d98c09f32",
    type: "bananas",
    createDate: "2024-09-04",
  },
  {
    id: "2cf3ea6a-a09a-46d8-a926-04cd29c80109",
    type: "apples",
    createDate: "2024-09-04",
  },
  {
    id: "2115498b-5afd-4976-a9e7-76b07b693b23",
    type: "apples",
    createDate: "2024-09-04",
  },
  {
    id: "14412bcc-04cd-4563-bc53-704c331d20f1",
    type: "apples",
    createDate: "2024-09-04",
  },
  {
    id: "f9fb9f00-a04c-4cb4-ac6f-8c8c196b3734",
    type: "carrots",
    createDate: "2024-09-04",
  },
  {
    id: "e39684ce-15e0-4cc2-b384-5fd9ae06362d",
    type: "carrots",
    createDate: "2024-09-04",
  },
  {
    id: "dcd8f523-95ca-4afd-b506-feb9e23a4939",
    type: "carrots",
    createDate: "2024-09-04",
  },
  {
    id: "a6c39636-d53f-4bc8-9197-258e0d3813be",
    type: "bananas",
    createDate: "2024-09-05",
  },
  {
    id: "b784ef63-e84b-49c2-91f8-d1ee9b17865a",
    type: "bananas",
    createDate: "2024-09-05",
  },
  {
    id: "3e804b15-17cf-4137-af4f-bd6be7685606",
    type: "bananas",
    createDate: "2024-09-05",
  },
  {
    id: "e26fef15-1021-4661-b1a6-16da643e716f",
    type: "apples",
    createDate: "2024-09-05",
  },
  {
    id: "9ddf4fe2-5ea7-4f88-ab53-3c77ea96fd5e",
    type: "apples",
    createDate: "2024-09-05",
  },
  {
    id: "d51910bd-895a-43c7-a05b-ba7af88f97f1",
    type: "apples",
    createDate: "2024-09-05",
  },
  {
    id: "efd7b4fa-c5e8-4499-9913-59441184087a",
    type: "carrots",
    createDate: "2024-09-05",
  },
  {
    id: "dc7e1f57-b842-4d05-9339-b955772b87d9",
    type: "carrots",
    createDate: "2024-09-05",
  },
  {
    id: "67f1d615-5d7d-4bfa-a66b-cdb8e6e62685",
    type: "carrots",
    createDate: "2024-09-05",
  },
  {
    id: "10134beb-c0ca-4baf-8dfe-8a3fe7d574cf",
    type: "bananas",
    createDate: "2024-09-06",
  },
  {
    id: "e2744614-d91f-493a-a41c-0f7a3e12b64f",
    type: "bananas",
    createDate: "2024-09-06",
  },
  {
    id: "d2430826-04f8-4199-89b1-4fb738efcaad",
    type: "bananas",
    createDate: "2024-09-06",
  },
  {
    id: "a504d7a0-58a4-4257-9f40-606b9b018606",
    type: "apples",
    createDate: "2024-09-06",
  },
  {
    id: "9b29b255-32a4-4740-acda-4c09938c1f88",
    type: "apples",
    createDate: "2024-09-06",
  },
  {
    id: "289f6d5e-8899-48c4-ab75-39abc10a7ee4",
    type: "carrots",
    createDate: "2024-09-06",
  },
];

const chartData = calculateCountForDataOnDates({
  data: {
    bananas: rawData.filter((item) => item.type === "bananas").map((item) => item.createDate),
    apples: rawData.filter((item) => item.type === "apples").map((item) => item.createDate),
    carrots: rawData.filter((item) => item.type === "carrots").map((item) => item.createDate),
  },
  startDate: "2024-08-14",
  endDate: "2024-09-06",
  cumulativeCount: false,
});


const meta: Meta<typeof SymbiosisBarChart> = {
  title: "Components/SymbiosisBarChart",
  component: SymbiosisBarChart,
  tags: ["autodocs"],
  argTypes: {
    data: {
      required: true,
      control: {
        type: "object",
      },
      description: "Data to be displayed in the chart",
      table: {
        type: {
          summary: "array",
        },
      },
    },
    config: {
      required: true,
      control: {
        type: "object",
      },
      description: "Config to map data keys to labels and colors",
      table: {
        type: {
          summary: "object",
        },
      },
    },
    xAxisFormatter: {
      control: false,
      description: "Function to override the default formatting of the x-axis labels",
      table: {
        type: {
          summary: "(value: string) => string",
        },
      },
    },
    tooltipLabelFormatter: {
      control: false,
      description: "Function to override the default formatting of the tooltip labels",
      table: {
        type: {
          summary: "(value: string) => string",
        },
      },
    },
  },
} satisfies Meta<typeof SymbiosisBarChart>;

export default meta;

type Story = StoryObj<typeof SymbiosisBarChart>;

const chartConfig = {
  apples: { label: "Apples", color: "bg-red-600" },
  bananas: { label: "Bananas", color: "bg-yellow-500" },
  carrots: { label: "Carrots", color: "bg-orange-500" },
} satisfies ChartConfig;

export const Basic: Story = {
  render: (args) => {
    return <SymbiosisBarChart {...args} />;
  },
  args: {
    data: chartData,
    config: chartConfig,
  },
};

export const CustomXAxisFormatter: Story = {
  render: (args) => {
    const xAxisFormatter = (value: string) => {
      return value.split("-")[2].split("T")[0];
    };

    return <SymbiosisBarChart {...args} xAxisFormatter={xAxisFormatter} />;
  },
  args: {
    data: chartData,
    config: chartConfig,
  },
};

export const CustomTooltipLabelFormatter: Story = {
  render: (args) => {
    const tooltipLabelFormatter = (value: string) => {
      return `${value.split("-")[2].split("T")[0]} ${value.split("-")[1]} ${value.split("-")[0]}`;
    };
    return <SymbiosisBarChart {...args} tooltipLabelFormatter={tooltipLabelFormatter} />;
  },
  args: {
    data: chartData,
    config: chartConfig,
  },
};

export const CustomUI: Story = {
  render: (args) => {
    return (
      <SymbiosisBarChart
        {...args}
        className="bg-slate-400 [&_.recharts-cartesian-axis-tick_text]:fill-white [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-white"
        legendClassName="text-white"
        tooltipClassName="rounded-none border-green-400 border-2"
      />
    );
  },
  args: {
    data: chartData,
    config: chartConfig,
  },
};
