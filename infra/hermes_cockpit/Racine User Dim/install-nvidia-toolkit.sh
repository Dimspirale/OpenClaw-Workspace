<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">

<!-- Begin Jekyll SEO tag v2.8.0 -->
<title>Unsupported distribution or misconfigured repository settings | NVIDIA Container Toolkit</title>
<meta name="generator" content="Jekyll v3.10.0" />
<meta property="og:title" content="Unsupported distribution or misconfigured repository settings" />
<meta property="og:locale" content="en_US" />
<meta name="description" content="A collection of utilities for using NVIDIA GPUs in containerized environments." />
<meta property="og:description" content="A collection of utilities for using NVIDIA GPUs in containerized environments." />
<link rel="canonical" href="https://nvidia.github.io/libnvidia-container/404.html" />
<meta property="og:url" content="https://nvidia.github.io/libnvidia-container/404.html" />
<meta property="og:site_name" content="NVIDIA Container Toolkit" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary" />
<meta property="twitter:title" content="Unsupported distribution or misconfigured repository settings" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebPage","description":"A collection of utilities for using NVIDIA GPUs in containerized environments.","headline":"Unsupported distribution or misconfigured repository settings","url":"https://nvidia.github.io/libnvidia-container/404.html"}</script>
<!-- End Jekyll SEO tag -->


    <link rel="stylesheet" href="/libnvidia-container/assets/css/style.css?v=1cdaa8649f27be48d31f58890b9923504e909bfd">
    <meta name="viewport" content="width=device-width">
    <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="wrapper">
      <header>
        <img src="/libnvidia-container/assets/logo.jpg">
        <h1>NVIDIA Container Toolkit</h1>
        <p>A collection of utilities for using NVIDIA GPUs in containerized environments.
</p>

        
          <p class="view"><a href="https://github.com/NVIDIA/libnvidia-container">View the Project on GitHub <small></small></a></p>
        

        

        
      </header>
      <section>

      <h1 id="unsupported-distribution-or-misconfigured-repository-settings">Unsupported distribution or misconfigured repository settings</h1>

<p>If you are seeing this message, it may mean that your are using an <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">unsupported distribution</a>.</p>

<p>It may also mean that your repositories are incorrectly configured.</p>

<p>In order to simplify the release process for the NVIDIA Container Toolkit and its components, we rely on a set of reference repositories which can be used across a number of distributions. The main references repositories and their compatible distributions are (this is not a complete list):</p>

<h2 id="generic-deb-package-repository">Generic .deb package repository</h2>

<h3 id="compatible-with">Compatible with</h3>

<p>Most distributions that use DEB packages. These include:</p>

<ul>
  <li>Ubuntu</li>
  <li>Debian</li>
</ul>

<h3 id="repository-list-urls">Repository list URLs</h3>

<ul>
  <li><code class="language-plaintext highlighter-rouge">https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list</code></li>
  <li><code class="language-plaintext highlighter-rouge">https://nvidia.github.io/libnvidia-container/experimental/deb/nvidia-container-toolkit.list</code></li>
</ul>

<h3 id="repository-roots">Repository roots</h3>

<ul>
  <li><code class="language-plaintext highlighter-rouge">https://nvidia.github.io/libnvidia-container/stable/deb</code></li>
  <li><code class="language-plaintext highlighter-rouge">https://nvidia.github.io/libnvidia-container/experimental/deb</code></li>
</ul>

<h2 id="generic-rpm-package-repository">Generic .rpm package repository</h2>

<h3 id="compatible-with-1">Compatible with</h3>

<p>Most distributions that use RPM packages. These include:</p>

<ul>
  <li>RHEL</li>
  <li>Fedora</li>
</ul>

<h3 id="repository-file-urls">Repository file URLs</h3>

<ul>
  <li><code class="language-plaintext highlighter-rouge">https://nvidia.github.io/libnvidia-container/stable/rpm/nvidia-container-toolkit.repo</code></li>
  <li><code class="language-plaintext highlighter-rouge">https://nvidia.github.io/libnvidia-container/experimental/rpm/nvidia-container-toolkit.repo</code></li>
</ul>

<h3 id="repository-roots-1">Repository roots</h3>

<ul>
  <li><code class="language-plaintext highlighter-rouge">https://nvidia.github.io/libnvidia-container/stable/rpm</code></li>
  <li><code class="language-plaintext highlighter-rouge">https://nvidia.github.io/libnvidia-container/experimental/rpm</code></li>
</ul>

<h2 id="github-pages-repository-structure">GitHub Pages repository structure</h2>

<p>The packages here are served from the <a href="https://github.com/NVIDIA/libnvidia-container/tree/gh-pages/"><code class="language-plaintext highlighter-rouge">gh-pages</code> branch</a> of the
<code class="language-plaintext highlighter-rouge">github.com/NVIDIA/libnvidia-container</code> repository. The repository folder structure maps directly to the package manager URLs.</p>

<p>For example, the repositories discused above can be found at:</p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">stable/deb</code>: https://github.com/NVIDIA/libnvidia-container/tree/gh-pages/stable/deb</li>
  <li><code class="language-plaintext highlighter-rouge">experimental/deb</code>: https://github.com/NVIDIA/libnvidia-container/tree/gh-pages/experimental/deb</li>
  <li><code class="language-plaintext highlighter-rouge">stable/rpm</code>: https://github.com/NVIDIA/libnvidia-container/tree/gh-pages/stable/rpm</li>
  <li><code class="language-plaintext highlighter-rouge">experimental/rpm</code>: https://github.com/NVIDIA/libnvidia-container/tree/gh-pages/experimental/rpm</li>
</ul>

<p>This also means that packages can be downloaded directly by appending the package filename to the following URLs:</p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">https://raw.githubusercontent.com/NVIDIA/libnvidia-container/gh-pages/stable/deb/amd64/</code></li>
  <li><code class="language-plaintext highlighter-rouge">https://raw.githubusercontent.com/NVIDIA/libnvidia-container/gh-pages/experimental/deb/amd64/</code></li>
  <li><code class="language-plaintext highlighter-rouge">https://raw.githubusercontent.com/NVIDIA/libnvidia-container/gh-pages/stable/rpm/amd64/</code></li>
  <li><code class="language-plaintext highlighter-rouge">https://raw.githubusercontent.com/NVIDIA/libnvidia-container/gh-pages/experimental/rpm/amd64/</code></li>
</ul>


      </section>
      <footer>
        
        <p>This project is maintained by <a href="https://github.com/NVIDIA">NVIDIA</a></p>
        
        <p><small>Copyright (c) 2017, NVIDIA CORPORATION.<br/>All rights reserved.</small></p>
      </footer>
    </div>
    <script src="/libnvidia-container/assets/js/scale.fix.js"></script>


  
  </body>
</html>
